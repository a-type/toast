import { mergeDeepRight } from 'ramda';

import * as scalars from './scalars';
import recipes from './recipes';
import users from './users';
import recipeIngredientCorrections from './recipeIngredientCorrections';
import groupInvitations from './groupInvitations';
import shoppingList from './shoppingList';

export default [
  recipes,
  users,
  recipeIngredientCorrections,
  groupInvitations,
  shoppingList,
  scalars,
].reduce(mergeDeepRight, {});
