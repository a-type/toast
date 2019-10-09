import { directiveTypeDefs } from 'graphql-arangodb';
import { gql } from 'apollo-server-core';
import foods from './foods';
import globals from './globals';
import groups from './groups';
import plan from './plan';
import ingredients from './ingredients';
import recipes from './recipes';
import users from './users';
import steps from './steps';
import feed from './feed';

export default [
  gql`
    ${directiveTypeDefs}
    directive @authenticated on FIELD_DEFINITION
    directive @generateSlug(fromArg: String, type: String) on FIELD_DEFINITION
    directive @hasClaim(claim: String!) on FIELD_DEFINITION
    directive @defaultValue(value: Any!) on FIELD_DEFINITION
    directive @subscribed on FIELD_DEFINITION
  `,
  globals,
  users,
  foods,
  groups,
  plan,
  ingredients,
  steps,
  recipes,
  feed,
];
