import { Firestore } from '@google-cloud/firestore';
import RecipeIngredientCorrection, {
  CorrectionStatus,
} from 'models/RecipeIngredientCorrection';

const COLLECTION = 'recipeIngredientCorrections';

export type ListFilter = {
  status: CorrectionStatus;
};

export type ListPagination = {
  offset: number;
  limit: number;
};

export default class RecipeIngredientCorrections {
  firestore: Firestore;

  constructor(service: { firestore: Firestore }) {
    this.firestore = service.firestore;
  }

  list = async (
    { offset = 0, limit = 10 }: ListPagination = { offset: 0, limit: 10 },
    filter: ListFilter = null,
  ) => {
    const collection = this.firestore.collection(`${COLLECTION}`);

    let query = collection.offset(offset).limit(limit);
    if (filter) {
      query = query.where('status', '==', filter.status);
    }

    const snapshots = await query.get();
    const corrections = snapshots.docs.map(doc =>
      RecipeIngredientCorrection.fromJSON(doc.data()),
    );
    return corrections;
  };

  set = async (correction: RecipeIngredientCorrection) => {
    const document = this.firestore.doc(`${COLLECTION}/${correction.id}`);
    await document.set(correction.toJSON());
    return correction;
  };

  get = async (id: string) => {
    const document = this.firestore.doc(`${COLLECTION}/${id}`);
    const ref = await document.get();
    if (ref.exists) {
      return RecipeIngredientCorrection.fromJSON(ref.data());
    }
    return null;
  };
}
