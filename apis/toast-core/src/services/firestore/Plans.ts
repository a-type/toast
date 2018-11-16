import { Firestore } from '@google-cloud/firestore';
import { Schedule, ShoppingList, Meal, Plan } from 'models';

const COLLECTION = 'plans';

export default class Plans {
  firestore: Firestore;

  constructor(service: { firestore: Firestore }) {
    this.firestore = service.firestore;
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
   * Schedules - represents user availability for cooking during a week.
   */

  getSchedule = async (planId, scheduleId = 'default') => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/schedules/${scheduleId}`,
    );
    const docRef = await document.get();

    if (!docRef.exists) {
      return null;
    }

    return Schedule.fromJSON(docRef.data());
  };

  setSchedule = async (planId, schedule: Schedule) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/schedules/${schedule.id}`,
    );

    await document.set(schedule.toJSON());
    return schedule;
  };

  /**
   * Meals - individual meals which can be accessed by date
   */

  getMeal = async (planId, dateIndex, mealIndex: number) => {
    const id = Meal.getId(dateIndex, mealIndex);
    const document = this.firestore.doc(`${COLLECTION}/${planId}/meals/${id}`);
    const docRef = await document.get();

    if (!docRef.exists) {
      const empty = Meal.createEmpty(dateIndex, mealIndex);
      await document.set(empty);
      return empty;
    }

    return Meal.fromJSON(docRef.data());
  };

  setMeal = async (planId, meal: Meal) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/meals/${meal.id}`,
    );

    await document.set(meal.toJSON());
    return meal;
  };

  getMealsByDate = async (planId: string, dateIndex: number) => {
    const collection = this.firestore.collection(
      `${COLLECTION}/${planId}/meals`,
    );
    const query = collection.where('dateIndex', '==', dateIndex);
    const snapshots = await query.get();
    return snapshots.docs.map(doc => Meal.fromJSON(doc.data()));
  };

  getMealRange = async (
    planId: string,
    startDateIndex: number,
    endDateIndex: number,
  ) => {
    const collection = this.firestore.collection(
      `${COLLECTION}/${planId}/meals`,
    );
    const query = collection
      .where('dateIndex', '>=', startDateIndex)
      .where('dateIndex', '<=', endDateIndex);
    const snapshots = await query.get();
    return snapshots.docs.map(doc => Meal.fromJSON(doc.data()));
  };

  /**
   * Shopping Lists - keeps track of what the user should buy each week
   */
  getShoppingList = async (planId: string, id: string) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/shoppingLists/${id}`,
    );
    const docRef = await document.get();

    if (!docRef.exists) {
      return null;
    }

    return ShoppingList.fromJSON(docRef.data());
  };

  setShoppingList = async (planId: string, shoppingList: ShoppingList) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/shoppingLists/${shoppingList.id}`,
    );

    await document.set(shoppingList.toJSON());
    return shoppingList;
  };
}
