import minimist from 'minimist';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { GraphQLUpload } from 'apollo-upload-server';
import { mergeDeepRight } from 'ramda';
import * as auth from './auth';
import * as images from './images';
import * as ingredients from './ingredients';
import * as recipes from './recipes';
import * as search from './search';
import * as steps from './steps';
import * as users from './users';
import * as roles from './roles';

import * as directives from './directives';

import mocks from './__mocks__';

const argv = minimist(process.argv.slice(2));

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
    hello: () => 'world',
  },
  Mutation: {
    ping: () => new Date().toISOString(),
  },
};

export const typeDefs = [
  globalTypeDefs,
  auth.typeDefs,
  images.typeDefs,
  ingredients.typeDefs,
  recipes.typeDefs,
  search.typeDefs,
  steps.typeDefs,
  users.typeDefs,
  roles.typeDefs,
];
export const resolvers = [
  auth.resolvers,
  images.resolvers,
  ingredients.resolvers,
  recipes.resolvers,
  search.resolvers,
  steps.resolvers,
  users.resolvers,
  roles.resolvers,
  { Upload: GraphQLUpload },
].reduce(mergeDeepRight, globalResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: directives,
});

if (argv.mock) {
  addMockFunctionsToSchema({ schema, mocks });
}

export default schema;
