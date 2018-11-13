import Schedule from 'models/Schedule';
import { START_WEEK_DAY } from '../../constants';
import { Firestore } from '@google-cloud/firestore';
import ShoppingList from 'models/ShoppingList';
import { PlanWeek } from 'models';
import { UserInputError } from 'errors';

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

    return Schedule.fromJSON(docRef.data());
  };

  merge = async (planId, planData) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(planData.toJSON(), { merge: true });
    const docRef = await document.get();
    return Schedule.fromJSON(docRef.data());
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
      const planDocument = this.firestore.doc(`${COLLECTION}/${planId}`);
      const planDocRef = await planDocument.get();
      if (!planDocRef.exists) {
        return null;
      }
      const plan = Schedule.fromJSON(planDocRef.data());
      return PlanWeek.fromSchedule(plan, week);
    }

    return PlanWeek.fromJSON(docRef.data());
  };

  setWeek = async (planId: string, weekData: PlanWeek) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/weeks/week_${weekData.weekIndex}`,
    );
    await document.set(weekData.toJSON());
    return weekData;
  };

  /**
   * Shopping Lists - keeps track of what the user should buy each week
   */
  getShoppingList = async (weekId: string, planId: string) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/shoppingLists/${weekId}`,
    );
    const docRef = await document.get();

    if (!docRef.exists) {
      return null;
    }

    return ShoppingList.fromJSON(docRef.data());
  };

  setShoppingList = async (
    planId: string,
    weekId: string,
    shoppingList: ShoppingList,
  ) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/shoppingLists/${weekId}`,
    );

    await document.set(shoppingList.toJSON());
    return shoppingList;
  };
}
