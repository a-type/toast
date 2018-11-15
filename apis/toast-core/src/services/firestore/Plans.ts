import { Firestore } from '@google-cloud/firestore';
import { PlanWeek, Schedule, ShoppingList } from 'models';
import Schedules from './Schedules';
import Plan from 'models/Plan';

const COLLECTION = 'plans';

export default class Plans {
  firestore: Firestore;
  schedules: Schedules;

  constructor(service: { firestore: Firestore; schedules: Schedules }) {
    this.firestore = service.firestore;
    this.schedules = service.schedules;
  }

  get = async planId => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    const docRef = await document.get();

    if (!docRef.exists) {
      return null;
    }

    return Plan.fromJSON(docRef.data());
  };

  set = async (planId, plan: Plan) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);

    await document.set(plan.toJSON());
    return plan;
  };

  /**
   * Weeks - collections of meals
   */
  getWeek = async (planId, week, fallbackScheduleId?) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/weeks/week_${week}`,
    );
    const docRef = await document.get();

    if (!docRef.exists) {
      if (fallbackScheduleId) {
        const schedule = await this.schedules.get(fallbackScheduleId);
        if (!schedule) {
          return null;
        }
        return PlanWeek.fromSchedule(schedule, week);
      } else {
        return null;
      }
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
  getShoppingList = async (planId: string, weekId: string) => {
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
