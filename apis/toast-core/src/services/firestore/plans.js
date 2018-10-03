const COLLECTION = 'plans';

const defaulted = plan => ({
  servingsPerMeal: 0,
  days: [],
  ...plan,
});

export default firestore => ({
  /**
   * For user's default plan, use user id
   */
  get: async planId => {
    const document = firestore.doc(`${COLLECTION}/${planId}`);
    const docRef = await document.get();
    if (!docRef.exists) {
      return null;
    }

    return defaulted(docRef.data());
  },

  merge: async (planId, planData) => {
    const document = firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(planData, { merge: true });
    const docRef = await document.get();
    return defaulted(docRef.data());
  },

  set: async (planId, plan) => {
    const document = firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(plan);
    return defaulted(plan);
  },
});
