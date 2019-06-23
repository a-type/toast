import { Firestore } from '@google-cloud/firestore';
import { addHours, isAfter, addDays } from 'date-fns';
import PurchaseList, { PurchaseListItem } from 'models/PurchaseList';
import DataLoader from 'dataloader';

const COLLECTION = 'purchaseLists';

export default class PurchaseLists {
  firestore: Firestore;

  constructor(service: { firestore: Firestore }) {
    this.firestore = service.firestore;
  }

  set = async (groupId: string, purchaseList: PurchaseList) => {
    const document = this.firestore.doc(`${COLLECTION}/${groupId}`);
    await document.set(purchaseList.toJSON());
    return purchaseList;
  };

  get = async (groupId: string) => {
    const document = this.firestore.doc(`${COLLECTION}/${groupId}`);
    const snapshot = await document.get();
    if (!snapshot.exists) {
      return null;
    }
    const purchaseList = PurchaseList.fromJSON(snapshot.data());
    if (isAfter(new Date(), purchaseList.endDate)) {
      const newList = PurchaseList.createEmpty(
        purchaseList.endDate,
        addDays(purchaseList.endDate, 7),
      );
      return this.set(groupId, newList);
    } else {
      return purchaseList;
    }
  };

  createIngredientLoader = (groupId: string) =>
    new DataLoader<string, PurchaseListItem>(async ingredientIds => {
      const purchaseList = await this.get(groupId);

      return ingredientIds.map(id => purchaseList.getIngredient(id));
    });
}
