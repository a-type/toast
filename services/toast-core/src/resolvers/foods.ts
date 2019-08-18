import { resolver as arango } from 'graphql-arangodb';

export default {
  Mutation: {
    updateFood: arango,
  },
};
