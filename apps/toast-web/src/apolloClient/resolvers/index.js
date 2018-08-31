import { mergeDeepRight } from 'ramda';
import search, { defaults as searchDefaults } from './search';

export const defaults = mergeDeepRight({}, searchDefaults);

export default mergeDeepRight({}, search);
