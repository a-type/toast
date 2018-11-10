import Plan from 'models/Plan';
import { START_WEEK_DAY } from '../../constants';
import { Firestore } from '@google-cloud/firestore';
import ShoppingList from 'models/ShoppingList';

const COLLECTION = 'plans';

export default class Plans {
  static START_WEEK_DAY = START_WEEK_DAY;
  START_WEEK_DAY = START_WEEK_DAY;

  firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  generateWeekId = (planId, week) => `${planId}_w_${week}`;
  generateShoppingListId = (planId, week) => `${planId}_sl_w_${week}`;

  /**
   * For user's default plan, use user id
   */
  get = async planId => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    const docRef = await document.get();
    if (!docRef.exists) {
      return null;
    }

    return Plan.fromJSON(docRef.data());
  };

  merge = async (planId, planData) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(planData.toJSON(), { merge: true });
    const docRef = await document.get();
    return Plan.fromJSON(docRef.data());
  };

  set = async (planId, plan) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(plan.toJSON());
    return plan;
  };

  /**
   * Weeks - copies of the base plan, applied per-week
   */
  getWeek = async (planId, week) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/weeks/week_${week}`,
    );
    const docRef = await document.get();

    if (!docRef.exists) {
      // copy the base plan instead
      const basePlanDocument = this.firestore.doc(`${COLLECTION}/${planId}`);
      const basePlanDocRef = await basePlanDocument.get();

      if (!basePlanDocRef.exists) {
        return null;
      }

      const basePlan = await basePlanDocRef.data();
      basePlan.id = this.generateWeekId(planId, week);
      basePlan.weekIndex = week;
      return Plan.fromJSON(basePlan);
    }

    return Plan.fromJSON(docRef.data());
  };

  mergeWeek = async (planId, week, planData) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/weeks/week_${week}`,
    );
    planData.id = this.generateWeekId(planId, week);
    planData.weekIndex = week;
    await document.set(planData.toJSON(), { merge: true });
    const docRef = await document.get();
    return Plan.fromJSON(docRef.data());
  };

  /**
   * Shopping Lists - keeps track of what the user should buy each week
   */
  getShoppingList = async (planId, week: number) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/shoppingLists/week_${week}`,
    );
    const docRef = await document.get();

    if (!docRef.exists) {
      return null;
    }

    return ShoppingList.fromJSON(docRef.data());
  };

  setShoppingList = async (
    planId,
    week: number,
    shoppingList: ShoppingList,
  ) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/shoppingLists/week_${week}`,
    );

    await document.set(shoppingList.toJSON());
    return shoppingList;
  };
}
