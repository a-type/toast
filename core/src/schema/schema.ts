import foods from './foods';
import globals from './globals';
import groups from './groups';
import ingredients from './ingredients';
import plan from './plan';
import recipes from './recipes';
import search from './search';
import shoppingList from './shoppingList';
import { directiveTypeDefs } from 'graphql-cypher';
import { gql } from 'apollo-server-core';

export default [
  // gql`
  //   ${directiveTypeDefs}
  // `,
  globals,
  foods,
  groups,
  ingredients,
  plan,
  recipes,
  search,
  shoppingList,
];
