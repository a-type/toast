import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import { GraphContext } from './types';

import {
  Users,
  Groups,
  Recipes,
  Ingredients,
  RecipeIngredients,
  Images,
  PlanDays,
  PlanMeals,
} from './sources';

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password),
);

export type Graph = {
  users: Users;
  groups: Groups;
  recipes: Recipes;
  ingredients: Ingredients;
  recipeIngredients: RecipeIngredients;
  images: Images;
  planDays: PlanDays;
  planMeals: PlanMeals;
};

export default (
  { writeMode = false, user = null, scopes = [] } = {
    writeMode: false,
    user: null,
    scopes: [],
  },
): Graph => {
  const ctx: GraphContext = {
    user,
    scopes,
    transaction: txFunction => {
      const sess = driver.session();
      if (writeMode) {
        return sess.writeTransaction(txFunction);
      } else {
        return sess.readTransaction(txFunction);
      }
    },
    writeTransaction: txFunction => {
      const sess = driver.session();
      return sess.writeTransaction(txFunction);
    },
    readTransaction: txFunction => {
      const sess = driver.session();
      return sess.readTransaction(txFunction);
    },
  };

  let graph = {};
  Object.assign(graph, {
    users: new Users(ctx, graph),
    groups: new Groups(ctx, graph),
    recipes: new Recipes(ctx, graph),
    ingredients: new Ingredients(ctx, graph),
    recipeIngredients: new RecipeIngredients(ctx, graph),
    images: new Images(ctx, graph),
    planDays: new PlanDays(ctx, graph),
    planMeals: new PlanMeals(ctx, graph),
  });

  return graph as Graph;
};
