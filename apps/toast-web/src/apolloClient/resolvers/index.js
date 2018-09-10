import { mergeDeepRight } from 'ramda';
import search, { defaults as searchDefaults } from './search';
import messages, { defaults as messagesDefaults } from './messages';
import recipe, { defaults as recipeDefaults } from './recipe';
import promotions, { defaults as promotionsDefaults } from './promotions';

export const defaults = [
  searchDefaults,
  messagesDefaults,
  recipeDefaults,
  promotionsDefaults,
].reduce(mergeDeepRight, {});

export default [search, messages, recipe, promotions].reduce(
  mergeDeepRight,
  {},
);
