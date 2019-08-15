import { mergeDeepRight } from 'ramda';

import * as scalars from './scalars';
import recipes from './recipes';
import users from './users';
import corrections from './corrections';
import groupInvitations from './groupInvitations';
import groups from './groups';
import plan from './plan';

export default [
  recipes,
  users,
  corrections,
  groupInvitations,
  scalars,
  groups,
  plan,
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
