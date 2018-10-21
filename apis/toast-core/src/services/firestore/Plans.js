const COLLECTION = 'plans';
const START_WEEK_DAY = new Date(2018, 9, 7);

export const addIds = plan => {
  const planId = plan.id;
  if (!planId) {
    throw new Error('Plan ID must be provided for a plan to be saved');
  }

  plan.days.forEach((day, dayIndex) => {
    day.id = `${planId}_day_${dayIndex}`;

    day.meals.forEach((meal, mealIndex) => {
      meal.id = `${day.id}_meal_${mealIndex}`;
    });
  });

  return plan;
};

const defaulted = (plan, weekIndex) => {
  if (weekIndex !== undefined) {
    return {
      servingsPerMeal: 0,
      days: [],
      ...plan,
      id: `week_${weekIndex}`,
      weekIndex,
    };
  }

  return {
    servingsPerMeal: 0,
    days: [],
    ...plan,
  };
};

export default class Plans {
  static START_WEEK_DAY = START_WEEK_DAY;
  START_WEEK_DAY = START_WEEK_DAY;

  constructor(firestore) {
    this.firestore = firestore;
  }

  /**
   * For user's default plan, use user id
   */
  get = async planId => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    const docRef = await document.get();
    if (!docRef.exists) {
      return null;
    }

    return addIds(defaulted(docRef.data()));
  };

  merge = async (planId, planData) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(addIds(planData), { merge: true });
    const docRef = await document.get();
    return defaulted(docRef.data());
  };

  set = async (planId, plan) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(addIds(plan));
    return defaulted(plan);
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
      return addIds(defaulted(basePlan, week));
    }

    return addIds(defaulted(docRef.data(), week));
  };

  mergeWeek = async (planId, week, planData) => {
    const document = this.firestore.doc(
      `${COLLECTION}/${planId}/weeks/week_${week}`,
    );
    await document.set(
      addIds({ ...planData, id: `week_${week}`, weekIndex: week }), // enforce id, week index...
      { merge: true },
    );
    const docRef = await document.get();
    return defaulted(docRef.data(), week);
  };
}
