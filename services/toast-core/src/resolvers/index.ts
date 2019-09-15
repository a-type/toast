import { mergeDeepRight } from 'ramda';

import * as scalars from './scalars';
import recipes from './recipes';
import users from './users';
import groups from './groups';
import plan from './plan';
import foods from './foods';
import ingredients from './ingredients';

export default [
  recipes,
  users,
  scalars,
  groups,
  plan,
  foods,
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
