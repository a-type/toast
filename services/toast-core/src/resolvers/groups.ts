import { resolver as arango } from 'graphql-arangodb';

export default {
  Query: {
    viewer: arango,
  },
  Mutation: {
    mergeUser: arango,
    createGroup: arango,
    setGroceryDay: arango,
  },
};
