import arango from 'graphql-arangodb';

export default {
  Mutation: {
    assignPlanDayCooking: arango,
    unassignPlanDayCooking: arango,
  },
};
