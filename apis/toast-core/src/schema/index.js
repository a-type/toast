import minimist from 'minimist';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { GraphQLUpload } from 'apollo-upload-server';
import { mergeDeepRight } from 'ramda';
import * as images from './images';
import * as ingredients from './ingredients';
import * as recipes from './recipes';
import * as search from './search';
import * as steps from './steps';
import * as users from './users';
import * as _directives from './directives';
import logger from 'logger';
import { gql } from 'apollo-server-express';

export { default as mocks } from './__mocks__';
export const directives = _directives;

const globalTypeDefs = gql`
  # scalar Upload

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
  recipes.typeDefs,
  search.typeDefs,
  steps.typeDefs,
  users.typeDefs,
];
export const resolvers = [
  images.resolvers,
  ingredients.resolvers,
  recipes.resolvers,
  search.resolvers,
  steps.resolvers,
  users.resolvers,
  { Upload: GraphQLUpload },
].reduce(mergeDeepRight, globalResolvers);
