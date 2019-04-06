import { gql } from 'apollo-server-express';
import { Context } from 'context';
import { addQuantities, convertQuantity } from 'tools/quantities';
import { startOfWeek, addDays, format } from 'date-fns';
import { PurchaseList } from 'models';

export const typeDefs = gql`
  type ShoppingListItem {
    id: ID!
    totalQuantity: Float!
    purchasedQuantity: Float!
    unit: String
    ingredient: Ingredient
    plannedUses: [RecipeIngredient!]!
    displayName: String!
  }

  type ShoppingList {
    id: ID!
    startDate: Date!
    endDate: Date!
    items: [ShoppingListItem!]!
  }

  input MarkPurchasedItemInput {
    shoppingListItemId: String!
  }

  input MarkUnpurchasedItemInput {
    shoppingListItemId: String!
  }

  extend type Group {
    shoppingList: ShoppingList! @neo4j_ignore
  }

  extend type Mutation {
    markPurchasedItem(input: MarkPurchasedItemInput!): ShoppingListItem!
    markUnpurchasedItem(input: MarkUnpurchasedItemInput!): ShoppingListItem!
  }
`;

type Recipe = {
  id: string;
  title: string;
};

type RecipeIngredient = {
  text: string;
  unit?: string;
  quantity: number;
  recipe: Recipe;
};

type Ingredient = {
  id: string;
  name: string;
};

type ShoppingListItem = {
  id: string;
  totalQuantity: number;
  purchasedQuantity: number;
  unit: string | null;
  plannedUses: RecipeIngredient[];
  ingredient: Ingredient;
  displayName: string;
};

const getListWeek = (): [Date, Date] => {
  const startDate = addDays(startOfWeek(new Date()), 7);
  const endDate = addDays(startDate, 7);
  return [startDate, endDate];
};

const getListOrEphemeral = async (ctx: Context, [startDate, endDate]) => {
  const groupId = await ctx.getGroupId();

  let list = await ctx.firestore.purchaseLists.get(groupId);
  if (list === null) {
    list = PurchaseList.createEmpty(startDate, endDate);
  }
  return list;
};

const loadShoppingList = async (groupId: string, ctx: Context) => {
  const [startDate, endDate] = getListWeek();

  const aggregatedIngredients: {
    [ingredientId: string]: ShoppingListItem;
  } = await ctx.readTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (:Group {id:$groupId})-[:HAS_PLAN_DAY]->(day:PlanDay)-[:HAS_PLAN_MEAL]->(:PlanMeal)-[:PLANS_TO_COOK]->(recipe:Recipe)<-[:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient)
      WHERE duration.between(date($startDate), day.date).days > 0 AND duration.between(date($startDate), day.date).days < 7
      OPTIONAL MATCH (recipeIngredient)<-[:USED_IN]-(ingredient:Ingredient)
      RETURN recipe {.id,.title}, recipeIngredient {.id,.text,.quantity,.unit}, ingredient {.id,.name}
    `,
      {
        groupId,
        startDate: format(startDate, 'YYYY-MM-DD'),
        endDate: format(endDate, 'YYYY-MM-DD'),
      },
    );

    return result.records.reduce((byIngredient, record) => {
      const ingredient = record.get('ingredient') || null;
      const recipeIngredient = record.get('recipeIngredient');
      recipeIngredient.recipe = record.get('recipe');

      const shoppingListItemId = ingredient
        ? ingredient.id
        : recipeIngredient.id;
      const displayName = ingredient ? ingredient.name : recipeIngredient.text;

      const ingredientEntry: ShoppingListItem = byIngredient[
        shoppingListItemId
      ] || {
        id: shoppingListItemId,
        totalQuantity: 0,
        purchasedQuantity: 0,
        unit: null,
        plannedUses: [],
        ingredient,
        displayName,
      };
      const sum = addQuantities(
        {
          value: ingredientEntry.totalQuantity,
          unit: ingredientEntry.unit,
        },
        {
          value: recipeIngredient.quantity,
          unit: recipeIngredient.unit,
        },
      );
      ingredientEntry.totalQuantity = sum.value || 0;
      ingredientEntry.unit = sum.unit;
      ingredientEntry.plannedUses.push(recipeIngredient);
      byIngredient[shoppingListItemId] = ingredientEntry;
      return byIngredient;
    }, {});
  });

  const purchaseList = await getListOrEphemeral(ctx, [startDate, endDate]);

  const ingredientsWithPurchased = Object.keys(aggregatedIngredients).map(
    shoppingListItemId => {
      const ingredientEntry = aggregatedIngredients[shoppingListItemId];
      const purchased = purchaseList.getIngredient(shoppingListItemId);
      if (!purchased) {
        ingredientEntry.purchasedQuantity = 0;
        return ingredientEntry;
      }

      const convertedPurchased = convertQuantity(
        {
          value: purchased.quantity,
          unit: purchased.unit,
        },
        ingredientEntry.unit,
      );

      ingredientEntry.purchasedQuantity = convertedPurchased.value;
      return ingredientEntry;
    },
  );

  return {
    id: 'shoppingList-' + startDate.toDateString(),
    startDate,
    endDate,
    items: ingredientsWithPurchased,
    purchaseList,
  };
};

export const resolvers = {
  Group: {
    shoppingList({ id: groupId }, _args, ctx: Context) {
      return loadShoppingList(groupId, ctx);
    },
  },

  Mutation: {
    async markPurchasedItem(
      _parent,
      { input },
      ctx: Context,
    ): Promise<Partial<ShoppingListItem>> {
      const groupId = await ctx.getGroupId();
      const shoppingList = await loadShoppingList(groupId, ctx);
      const shoppingListItem = shoppingList.items.find(
        item => item.id === input.shoppingListItemId,
      );
      const item = shoppingList.purchaseList.purchase(
        shoppingListItem.id,
        shoppingListItem.totalQuantity,
        shoppingListItem.unit,
      );
      await ctx.firestore.purchaseLists.set(groupId, shoppingList.purchaseList);

      return {
        ...shoppingListItem,
        purchasedQuantity: item.quantity,
      };
    },

    async markUnpurchasedItem(
      _parent,
      { input },
      ctx: Context,
    ): Promise<Partial<ShoppingListItem>> {
      const groupId = await ctx.getGroupId();
      const shoppingList = await loadShoppingList(groupId, ctx);
      const shoppingListItem = shoppingList.items.find(
        item => item.id === input.shoppingListItemId,
      );
      const item = shoppingList.purchaseList.unpurchase(shoppingListItem.id);
      await ctx.firestore.purchaseLists.set(groupId, shoppingList.purchaseList);

      return {
        ...shoppingListItem,
        purchasedQuantity: item.quantity,
      };
    },
  },
};
