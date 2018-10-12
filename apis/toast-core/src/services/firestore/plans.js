const COLLECTION = 'plans';
const START_WEEK_DAY = new Date(2018, 10, 7);

const defaulted = plan => ({
  servingsPerMeal: 0,
  days: [],
  ...plan,
});

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

    return defaulted(docRef.data());
  };

  merge = async (planId, planData) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(planData, { merge: true });
    const docRef = await document.get();
    return defaulted(docRef.data());
  };

  set = async (planId, plan) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(plan);
    return defaulted(plan);
  };

  /**
   * Weeks - copies of the base plan, applied per-week
   */
  getWeek = async (planId, week) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}/week_${week}`);
    const docRef = await document.get();

    if (!docRef.exists) {
      // copy the base plan instead
      return await this.get(planId);
    }

    return defaulted(docRef.data());
  };

  mergeWeek = async (planId, week, planData) => {
    const document = this.firestore.doc(`${COLLECTION}/${planId}/week_${week}`);
    await document.set(planData, { merge: true });
    const docRef = await document.get();
    return defaulted(docRef.data());
  };
}
