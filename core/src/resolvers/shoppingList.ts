import { Context } from 'context';
import { addQuantities, convertQuantity } from 'tools/quantities';
import { startOfWeek, addDays, format } from 'date-fns';
import { PurchaseList } from 'models';

type ShoppingListItemUsage = {
  recipeIngredientText: string;
  recipeTitle: string;
  recipeId: string;
  ingredientId: string;
};

type ShoppingListItem = {
  id: string;
  totalQuantity: number;
  purchasedQuantity: number;
  unit: string | null;
  plannedUses: ShoppingListItemUsage[];
  foodId: string;
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

  const aggregatedFoods: {
    [foodId: string]: ShoppingListItem;
  } = await ctx.readTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (:Group {id:$groupId})-[:HAS_PLAN_MEAL]->
        (:PlanMeal)-[:PLANS_TO_COOK]->(recipe:Recipe)
        <-[:INGREDIENT_OF]-(ing:Ingredient)
      WHERE duration.between(date($startDate), day.date).days > 0
      AND duration.between(date($startDate), day.date).days < 7
      OPTIONAL MATCH (ing)<-[:USED_IN]-(food:Food)
      RETURN recipe {.id,.title}, ing {.id,.text,.quantity,.unit}, food {.id,.name}
    `,
      {
        groupId,
        startDate: format(startDate, 'YYYY-MM-DD'),
        endDate: format(endDate, 'YYYY-MM-DD'),
      },
    );

    return result.records.reduce((byFood, record) => {
      const food = record.get('food') || null;
      const ingredient = record.get('ingredient');
      const recipe = record.get('recipe');

      const shoppingListItemId = food ? food.id : ingredient.id;
      const displayName = food ? food.name : ingredient.text;

      const foodEntry: ShoppingListItem = byFood[shoppingListItemId] || {
        id: shoppingListItemId,
        totalQuantity: 0,
        purchasedQuantity: 0,
        unit: null,
        plannedUses: [],
        foodId: food && food.id,
        displayName,
      };
      const sum = addQuantities(
        {
          value: foodEntry.totalQuantity,
          unit: foodEntry.unit,
        },
        {
          value: ingredient.quantity,
          unit: ingredient.unit,
        },
      );
      foodEntry.totalQuantity = sum.value || 0;
      foodEntry.unit = sum.unit;
      foodEntry.plannedUses.push({
        recipeIngredientText: ingredient.text,
        recipeTitle: recipe.title,
        recipeId: recipe.id,
        ingredientId: ingredient.id,
      });
      byFood[shoppingListItemId] = foodEntry;
      return byFood;
    }, {});
  });

  const purchaseList = await getListOrEphemeral(ctx, [startDate, endDate]);

  const ingredientsWithPurchased: ShoppingListItem[] = Object.keys(
    aggregatedFoods,
  ).map(shoppingListItemId => {
    const foodEntry = aggregatedFoods[shoppingListItemId];
    const purchased = purchaseList.getIngredient(shoppingListItemId);
    if (!purchased) {
      foodEntry.purchasedQuantity = 0;
      return foodEntry;
    }

    const convertedPurchased = convertQuantity(
      {
        value: purchased.quantity,
        unit: purchased.unit,
      },
      foodEntry.unit,
    );

    foodEntry.purchasedQuantity = convertedPurchased.value;
    return foodEntry;
  });

  return {
    id: 'shoppingList-' + startDate.toDateString(),
    startDate,
    endDate,
    items: ingredientsWithPurchased,
    purchaseList,
  };
};

export default {
  Group: {
    shoppingList({ id: groupId }, _args, ctx: Context) {
      return loadShoppingList(groupId, ctx);
    },
  },

  Mutation: {
    async markShoppingListItem(
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

    async unmarkShoppingListItem(
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
