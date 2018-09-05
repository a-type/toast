import { mergeDeepRight } from 'ramda';
import search, { defaults as searchDefaults } from './search';
import messages, { defaults as messagesDefaults } from './messages';
import recipe, { defaults as recipeDefaults } from './recipe';

export const defaults = [
  searchDefaults,
  messagesDefaults,
  recipeDefaults,
].reduce(mergeDeepRight, {});

export default [search, messages, recipe].reduce(mergeDeepRight, {});
