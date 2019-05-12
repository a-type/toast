import { mergeDeepRight } from 'ramda';
import * as images from './images';
import * as ingredients from './ingredients';
import * as recipes from './recipes';
import * as recipeIngredients from './recipeIngredients';
import * as recipeSteps from './recipeSteps';
import * as search from './search';
import * as users from './users';
import * as groups from './groups';
import * as planDays from './planDays';
import * as planMeals from './planMeals';
import * as recipeIngredientCorrections from './recipeIngredientCorrections';
import * as groupInvitations from './groupInvitations';
import * as shoppingList from './shoppingList';

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
  recipes.typeDefs,
  recipeIngredients.typeDefs,
  recipeSteps.typeDefs,
  search.typeDefs,
  users.typeDefs,
  groups.typeDefs,
  recipeIngredientCorrections.typeDefs,
  groupInvitations.typeDefs,
  planDays.typeDefs,
  planMeals.typeDefs,
  shoppingList.typeDefs,
];
export const resolvers = [
  images.resolvers,
  ingredients.resolvers,
  recipes.resolvers,
  recipeIngredients.resolvers,
  recipeSteps.resolvers,
  search.resolvers,
  users.resolvers,
  groups.resolvers,
  recipeIngredientCorrections.resolvers,
  groupInvitations.resolvers,
  planDays.resolvers,
  planMeals.resolvers,
  shoppingList.resolvers,
  scalars,
].reduce(mergeDeepRight, globalResolvers);
