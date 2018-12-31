import { Firestore } from '@google-cloud/firestore';
import { RecipeIngredientCorrection } from 'models';

const COLLECTION = 'corrections';

export default class Corrections {
  firestore: Firestore;

  constructor(service: { firestore: Firestore }) {
    this.firestore = service.firestore;
  }

  listRecipeIngredients = async (offset = 0, limit = 10) => {
    const collection = this.firestore.collection(`${COLLECTION}`);

    const query = collection.offset(offset).limit(limit);
    const snapshots = await query.get();
    const corrections = snapshots.docs.map(doc =>
      RecipeIngredientCorrection.fromJSON(doc.data()),
    );
    return corrections;
  };

  createRecipeIngredient = async correction => {
    const document = this.firestore.doc(`${COLLECTION}/${correction.id}`);
    await document.set(correction.toJSON());
    return correction;
  };
}
