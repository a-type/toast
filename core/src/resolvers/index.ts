import { mergeDeepRight } from 'ramda';

import * as scalars from './scalars';
import recipes from './recipes';
import users from './users';
import ingredientCorrections from './ingredientCorrections';
import groupInvitations from './groupInvitations';
import shoppingList from './shoppingList';

export default [
  recipes,
  users,
  ingredientCorrections,
  groupInvitations,
  shoppingList,
  scalars,
].reduce(mergeDeepRight, {});
