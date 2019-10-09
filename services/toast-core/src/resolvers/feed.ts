import { resolver as arango } from 'graphql-arangodb';

export default {
  Query: {
    feed: arango,
  },
};
