import { Context } from 'context';
import { id } from 'tools';
import { ValidationError } from 'errors';
import { parse, isValid } from 'date-fns';

enum IngredientCorrectionType {
  ChangeFood = 'ChangeFood',
  ChangeQuantity = 'ChangeQuantity',
  ChangeUnit = 'ChangeUnit',
  Add = 'Add',
  Remove = 'Remove',
}

enum IngredientCorrectionStatus {
  Submitted = 'Submitted',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

type IngredientCorrectionsCollectionFilterInput = {
  first?: number;
  after?: Date;
  status?: IngredientCorrectionStatus;
};

type BaseIngredientCorrectionData = {
  status: IngredientCorrectionStatus;
  submittedAt: Date;
};

type ChangeFoodIngredientCorrectionData = BaseIngredientCorrectionData & {
  correctionType: IngredientCorrectionType.ChangeFood;
  ingredientId: string;
  foodId: string;
};

type ChangeQuantityIngredientCorrectionData = BaseIngredientCorrectionData & {
  correctionType: IngredientCorrectionType.ChangeQuantity;
  ingredientId: string;
  quantity: number;
};

type ChangeUnitIngredientCorrectionData = BaseIngredientCorrectionData & {
  correctionType: IngredientCorrectionType.ChangeUnit;
  ingredientId: string;
  unit: string;
};

type AddIngredientCorrectionData = BaseIngredientCorrectionData & {
  correctionType: IngredientCorrectionType.Add;
  text: string;
  recipeId: string;
};

type RemoveIngredientCorrectionData = BaseIngredientCorrectionData & {
  correctionType: IngredientCorrectionType.Remove;
  ingredientId: string;
};

type IngredientCorrectionData =
  | ChangeFoodIngredientCorrectionData
  | ChangeQuantityIngredientCorrectionData
  | ChangeUnitIngredientCorrectionData
  | AddIngredientCorrectionData
  | RemoveIngredientCorrectionData;

const COLLECTION_NAME = 'ingredientCorrections';

const applyCorrection = async (
  data: IngredientCorrectionData & { id: string },
  ctx: Context,
) => {
  if (data.correctionType === IngredientCorrectionType.Add) {
    const [parsed] = await ctx.scanning.parseIngredients([data.text]);
    const ingredient = ctx.scanning.parsedIngredientToRecipeIngredient(parsed);
    await ctx.writeTransaction(async tx => {
      if (!ingredient.foodId) {
        const foodRes = await tx.run(
          `
          CREATE (food:Food {id: $id, name: $name, alternateNames: [], searchHelpers: []})
          RETURN food {.id}
        `,
          {
            id: id(),
            name: parsed.food.normalized,
          },
        );

        ingredient.foodId = foodRes.records[0].get('food').id;
      }

      await tx.run(
        `
        MATCH (recipe:Recipe{id:$recipeId}), (food:Food{id:$foodId})
        CREATE (recipe)<-[:INGREDIENT_OF]-(ing:Ingredient)<-[:USED_IN]-(food)
        SET ing += props
      `,
        {
          recipeId: data.recipeId,
          foodId: ingredient.foodId,
          props: {
            text: ingredient.text,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            foodStart: ingredient.foodStart,
            foodEnd: ingredient.foodEnd,
            quantityStart: ingredient.quantityStart,
            quantityEnd: ingredient.quantityEnd,
            unitStart: ingredient.unitStart,
            unitEnd: ingredient.unitEnd,
          },
        },
      );
    });
  } else if (data.correctionType === IngredientCorrectionType.Remove) {
    await ctx.writeTransaction(async tx => {
      await tx.run(`MATCH (ing:Ingredient{id:$id}) DETACH DELETE ing`, {
        id: data.ingredientId,
      });
    });
  } else if (data.correctionType === IngredientCorrectionType.ChangeFood) {
    await ctx.writeTransaction(async tx => {
      await tx.run(
        `
        MATCH (ing:Ingredient{id:$id}), (food:Food{id:$foodId})
        MERGE (ing)<-[:USED_IN]-(food)
      `,
        {
          id: data.ingredientId,
          foodId: data.foodId,
        },
      );
    });
  } else if (data.correctionType === IngredientCorrectionType.ChangeQuantity) {
    await ctx.writeTransaction(async tx => {
      await tx.run(
        `
        MATCH (ing:Ingredient{id:$id})
        SET ing.quantity = $quantity
      `,
        {
          id: data.ingredientId,
          quantity: data.quantity,
        },
      );
    });
  } else if (data.correctionType === IngredientCorrectionType.ChangeUnit) {
    await ctx.writeTransaction(async tx => {
      await tx.run(
        `
        MATCH (ing:Ingredient{id:$id})
        SET ing.unit = $unit
      `,
        {
          id: data.ingredientId,
          unit: data.unit,
        },
      );
    });
  } else {
    throw new ValidationError(
      `Unrecognized correction type ${(data as any).correctionType}`,
    );
  }

  const collection = ctx.firestore.firestore.collection(COLLECTION_NAME);
  const doc = collection.doc(data.id);
  await doc.set(
    {
      status: IngredientCorrectionStatus.Accepted,
    },
    {
      merge: true,
    },
  );
};

export default {
  Query: {
    ingredientCorrectionsConnection: async (
      _parent,
      { input }: { input: IngredientCorrectionsCollectionFilterInput },
      ctx: Context,
    ) => {
      const limit = input.first || 10;
      const collection = ctx.firestore.firestore.collection(COLLECTION_NAME);
      let query = collection.orderBy('submittedAt').limit(limit);
      if (input.status) {
        query = query.where('status', '==', input.status);
      }
      if (input.after) {
        const afterTs = parse(input.after);
        if (!isValid(afterTs)) {
          throw new ValidationError(
            `The cursor format is not correct. Please use a cursor from a previous query edge.`,
          );
        }
        query = query.startAfter(afterTs);
      }

      const snapshots = await query.get();
      const hasNextPage = snapshots.size === limit;

      return {
        pageInfo: {
          hasNextPage,
        },
        edges: snapshots.docs.map(doc => {
          const data = doc.data();
          const cursor = data.submittedAt.toString();
          return {
            cursor,
            node: {
              id: doc.id,
              ...data,
            },
          };
        }),
      };
    },
  },

  Mutation: {
    submitIngredientCorrection: async (_parent, { input }, ctx: Context) => {
      const common = {
        submittedAt: new Date(),
        status: IngredientCorrectionStatus.Submitted,
      };

      let correction: IngredientCorrectionData;

      if (!!input.add) {
        correction = {
          ...common,
          correctionType: IngredientCorrectionType.Add,
          text: input.add.text,
          recipeId: input.recipeId,
        };
      } else if (!!input.remove) {
        correction = {
          ...common,
          correctionType: IngredientCorrectionType.Remove,
          ingredientId: input.remove.ingredientId,
        };
      } else if (!!input.changeFood) {
        correction = {
          ...common,
          correctionType: IngredientCorrectionType.ChangeFood,
          foodId: input.changeFood.foodId,
          ingredientId: input.changeFood.ingredientId,
        };
      } else if (!!input.changeQuantity) {
        correction = {
          ...common,
          correctionType: IngredientCorrectionType.ChangeQuantity,
          quantity: input.changeQuantity.quantity,
          ingredientId: input.changeQuantity.ingredientId,
        };
      } else if (!!input.changeUnit) {
        correction = {
          ...common,
          correctionType: IngredientCorrectionType.ChangeUnit,
          unit: input.changeUnit.unit,
          ingredientId: input.changeUnit.ingredientId,
        };
      } else {
        throw new ValidationError(
          'input must include exactly one submission type (add, remove, changeFood, changeQuanity, changeUnit',
        );
      }

      const isImmediatelyApplied = await ctx.readTransaction(async tx => {
        const res = await tx.run(
          `
          MATCH (recipe:Recipe{id:$id})
          OPTIONAL MATCH authorPath=(:User{id:$userId})-[:AUTHOR_OF]->(recipe)
          RETURN recipe {.public, .locked}, size(authorPath) as authorCount
          `,
          { id: input.recipeId, userId: ctx.user.id },
        );

        if (!res.records || res.records.length === 0) {
          return false;
        }

        if (res.records[0].get('authorCount')) {
          return true;
        }

        const recipe = res.records[0].get('recipe');
        return !recipe.public || !recipe.locked;
      });

      const collection = ctx.firestore.firestore.collection(COLLECTION_NAME);

      const doc = await collection.add(correction);

      if (isImmediatelyApplied) {
        await applyCorrection({ ...correction, id: doc.id }, ctx);
      }

      return {
        id: doc.id,
        ...correction,
      };
    },

    acceptIngredientCorrection: async (_parent, args, ctx: Context) => {
      const collection = ctx.firestore.firestore.collection(COLLECTION_NAME);
      const doc = collection.doc(args.input.ingredientCorrectionId);
      const snapshot = await doc.get();
      const data = snapshot.data() as IngredientCorrectionData;
      await applyCorrection({ ...data, id: doc.id }, ctx);
      return {
        ...data,
        id: doc.id,
        status: IngredientCorrectionStatus.Accepted,
      };
    },

    rejectIngredientCorrection: async (_parent, args, ctx: Context) => {
      const collection = ctx.firestore.firestore.collection(COLLECTION_NAME);
      const doc = collection.doc(args.input.ingredientCorrectionId);
      await doc.set(
        {
          status: IngredientCorrectionStatus.Rejected,
        },
        {
          merge: true,
        },
      );
      return {
        id: doc.id,
        status: IngredientCorrectionStatus.Rejected,
      };
    },
  },

  IngredientCorrection: {
    __resolveType: obj => {
      switch (obj.correctionType) {
        case IngredientCorrectionType.ChangeFood:
          return 'ChangeFoodIngredientCorrection';
        case IngredientCorrectionType.ChangeQuantity:
          return 'ChangeQuantityIngredientCorrection';
        case IngredientCorrectionType.ChangeUnit:
          return 'ChangeUnitIngredientCorrection';
        case IngredientCorrectionType.Add:
          return 'AddIngredientCorrection';
        case IngredientCorrectionType.Remove:
          return 'RemoveIngredientCorrection';
        default:
          throw new Error('Unrecognized correction type ' + obj.correctionType);
      }
    },
  },
};
