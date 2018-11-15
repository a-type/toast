import Schedule from 'models/Schedule';
import { START_WEEK_DAY } from '../../constants';
import { Firestore } from '@google-cloud/firestore';

const COLLECTION = 'schedules';

export default class Schedules {
  static START_WEEK_DAY = START_WEEK_DAY;
  START_WEEK_DAY = START_WEEK_DAY;

  firestore: Firestore;

  constructor({ firestore }: { firestore: Firestore }) {
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
}
