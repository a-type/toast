import { mergeDeepRight } from 'ramda';
import search, { defaults as searchDefaults } from './search';
import messages, { defaults as messagesDefaults } from './messages';

export const defaults = mergeDeepRight(searchDefaults, messagesDefaults);
console.info(defaults);

export default mergeDeepRight(search, messages);
