import { Firestore } from '@google-cloud/firestore';
import IngredientCorrection, {
  CorrectionStatus,
} from 'models/IngredientCorrection';

const COLLECTION = 'ingredientCorrections';

export type ListFilter = {
  status: CorrectionStatus;
};

export type ListPagination = {
  offset: number;
  limit: number;
};

export default class IngredientCorrections {
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
      IngredientCorrection.fromJSON(doc.data()),
    );
    return corrections;
  };

  set = async (correction: IngredientCorrection) => {
    const document = this.firestore.doc(`${COLLECTION}/${correction.id}`);
    await document.set(correction.toJSON());
    return correction;
  };

  get = async (id: string) => {
    const document = this.firestore.doc(`${COLLECTION}/${id}`);
    const ref = await document.get();
    if (ref.exists) {
      return IngredientCorrection.fromJSON(ref.data());
    }
    return null;
  };
}
