import { mergeDeepRight } from 'ramda';

import * as scalars from './scalars';
import recipes from './recipes';
import users from './users';
import ingredientCorrections from './ingredientCorrections';
import groupInvitations from './groupInvitations';
import shoppingList from './shoppingList';
import ingredients from './ingredients';

export default [
  recipes,
  users,
  ingredientCorrections,
  groupInvitations,
  shoppingList,
  scalars,
  ingredients,
].reduce(mergeDeepRight, {
  Query: {
    foo: () => false,
  },
  Mutation: {
    ping: () => 'pong',
  },
}) as {
  Query: { [key: string]: Function };
  Mutation: { [key: string]: Function };
};
