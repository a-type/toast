import { NotFoundError } from 'errors';

const COLLECTION = 'plans';

export default firestore => ({
  /**
   * For user's default plan, use user id
   */
  get: async planId => {
    const document = firestore.doc(`${COLLECTION}/${planId}`);
    const docRef = await document.get();
    if (!docRef.exists) {
      throw new NotFoundError('Plan', planId);
    }

    return docRef.data();
  },

  merge: async (planId, planData) => {
    const document = firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(planData, { merge: true });
    const docRef = await document.get();
    return docRef.data();
  },

  set: async (planId, plan) => {
    const document = firestore.doc(`${COLLECTION}/${planId}`);
    await document.set(plan);
    return plan;
  },
});
