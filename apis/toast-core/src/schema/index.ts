import { mergeDeepRight } from 'ramda';
import * as images from './images';
import * as ingredients from './ingredients';
import * as recipes from './recipes';
import * as search from './search';
import * as steps from './steps';
import * as users from './users';
import * as groups from './groups';
import * as plans from './plans';

import * as directives from './directives';
import * as scalars from './scalars';

import { gql } from 'apollo-server-express';

export { default as mocks } from './_mocks';

export { scalars, directives };

const globalTypeDefs = gql`
  scalar Date
  scalar WeekDay

  enum SortOrder {
    ASCENDING
    DESCENDING
  }

  input ListMoveInput {
    fromIndex: Int!
    toIndex: Int!
  }

  input ListPaginationInput {
    offset: Int
    count: Int
  }

  type Query {
    hello: String!
  }

  type Mutation {
    ping: String!
  }
`;

const globalResolvers = {
  Query: {
    hello: () => 'world',
  },
  Mutation: {
    ping: () => new Date().toISOString(),
  },
};

export const typeDefs = [
  globalTypeDefs,
  images.typeDefs,
  ingredients.typeDefs,
  ...recipes.typeDefs(),
  search.typeDefs,
  steps.typeDefs,
  users.typeDefs,
  groups.typeDefs,
  ...plans.typeDefs(),
];
export const resolvers = [
  images.resolvers,
  ingredients.resolvers,
  recipes.resolvers,
  search.resolvers,
  steps.resolvers,
  users.resolvers,
  groups.resolvers,
  plans.resolvers,
  scalars,
].reduce(mergeDeepRight, globalResolvers);
