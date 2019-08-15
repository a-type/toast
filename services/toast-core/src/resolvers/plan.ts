import { resolver as arango } from 'graphql-arangodb';

export default {
  Mutation: {
    addPlanMeal: arango,
    removePlanMeal: arango,
  },
};
