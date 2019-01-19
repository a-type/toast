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

  set = async (plan: Plan) => {
    const document = this.firestore.doc(`${COLLECTION}/${plan.id}`);

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
      return Schedule.createEmpty(scheduleId);
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
      const schedule = await this.getSchedule(planId); // TODO: custom schedule
      return schedule.getPlanMeal(dateIndex, mealIndex);
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
    const meals = snapshots.docs.map(doc => Meal.fromJSON(doc.data()));
    const sparseMealList = meals.reduce<Meal[]>((range, meal) => {
      range[meal.mealIndex] = meal;
      return range;
    }, new Array(3).fill(null));

    return this._fillMissingMealsFromPlan(planId, dateIndex, sparseMealList);
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
    const meals = snapshots.docs.map(doc => Meal.fromJSON(doc.data()));
    // enforce sparse array if there are missing meals
    const sparseMealsList = meals.reduce<Meal[]>((range, meal) => {
      range[(meal.dateIndex - startDateIndex) * 3 + meal.mealIndex] = meal;
      return range;
    }, new Array((endDateIndex - startDateIndex) * 3).fill(null));

    return this._fillMissingMealsFromPlan(
      planId,
      startDateIndex,
      sparseMealsList,
    );
  };

  _fillMissingMealsFromPlan = async (
    planId,
    startDateIndex,
    sparseMealsList,
  ) => {
    if (sparseMealsList.length !== sparseMealsList.filter(Boolean).length) {
      const schedule = await this.getSchedule(planId); // TODO: non-default schedule
      return sparseMealsList.map((meal, index) => {
        if (meal) {
          return meal;
        }

        const dateIndex = startDateIndex + Math.floor(index / 3);
        const mealIndex = index % 3; // ASSUMPTION: meal range always starts with 0th meal index
        const templateMeal = schedule.getPlanMeal(dateIndex, mealIndex);
        return templateMeal;
      });
    } else {
      return sparseMealsList;
    }
  };

  /**
   * Shopping Lists - keeps track of what the user should buy each week
   */
  getShoppingList = async (planId: string, id: string = 'current') => {
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
      `${COLLECTION}/${planId}/shoppingLists/current`, // TODO: shopping list history?
    );

    await document.set(shoppingList.toJSON());
    return shoppingList;
  };
}
