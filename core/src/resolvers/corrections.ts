import { Context } from 'context';
import { id } from 'tools';
import logger from 'logger';
import { NotFoundError } from 'errors';

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

export default {
  Query: {
    ingredientCorrectionsConnection: async (
      _parent,
      { input }: { input: IngredientCorrectionsCollectionFilterInput },
      ctx: Context,
    ) => {
      const limit = input.first || 10;
      const collection = ctx.firestore.firestore.collection(
        'ingredientCorrections',
      );
      let query = collection.orderBy('submittedAt').limit(limit);
      if (input.status) {
        query = query.where('status', '==', input.status);
      }
      if (input.after) {
        query = query.startAfter(input.after);
      }

      const snapshots = await query.get();
      const hasNextPage = snapshots.length === limit;

      return {
        pageInfo: {},
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
