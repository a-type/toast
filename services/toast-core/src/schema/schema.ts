import { directiveTypeDefs } from 'graphql-arangodb';
import { gql } from 'apollo-server-core';
import foods from './foods';
import globals from './globals';
import groups from './groups';
import ingredients from './ingredients';
import plan from './plan';
import recipes from './recipes';
import search from './search';
import shoppingList from './shoppingList';
import corrections from './corrections';

export default [
  gql`
    ${directiveTypeDefs}
    directive @authenticated on FIELD_DEFINITION
    directive @generateSlug(fromArg: String, type: String) on FIELD_DEFINITION
    directive @hasClaim(claim: String!) on FIELD_DEFINITION
    directive @defaultValue(value: Any!) on FIELD_DEFINITION
  `,
  globals,
  foods,
  groups,
  ingredients,
  plan,
  recipes,
  search,
  shoppingList,
  corrections,
];
