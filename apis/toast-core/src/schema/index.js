import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'apollo-upload-server';
import { mergeDeepRight } from 'ramda';
import * as auth from './auth';
import * as images from './images';
import * as ingredients from './ingredients';
import * as recipes from './recipes';
import * as search from './search';
import * as steps from './steps';
import * as users from './users';

import * as directives from './directives';

const globalTypeDefs = `
  scalar Upload

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
    hello: () => 'world'
  },
  Mutation: {
    ping: () => new Date().toISOString()
  }
};

export const typeDefs = [
  globalTypeDefs,
  auth.typeDefs,
  images.typeDefs,
  ingredients.typeDefs,
  recipes.typeDefs,
  search.typeDefs,
  steps.typeDefs,
  users.typeDefs
];
export const resolvers = [
  auth.resolvers,
  images.resolvers,
  ingredients.resolvers,
  recipes.resolvers,
  search.resolvers,
  steps.resolvers,
  users.resolvers,
  { Upload: GraphQLUpload }
].reduce(mergeDeepRight, globalResolvers);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: directives
});
