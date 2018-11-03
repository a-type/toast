import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import { camel } from 'change-case';

import {
  Users,
  Groups,
  Recipes,
  Ingredients,
  RecipeIngredients,
} from './sources';

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password),
);

export default (
  { writeMode = false, user = null, scopes = [] } = {
    writeMode: false,
    user: null,
    scopes: [],
  },
) => {
  const ctx = {
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

  const graph = {
    transaction: ctx.transaction,
  };
  graph.users = new Users(ctx, graph);
  graph.groups = new Groups(ctx, graph);
  graph.recipes = new Recipes(ctx, graph);
  graph.ingredients = new Ingredients(ctx, graph);
  graph.recipeIngredients = new RecipeIngredients(ctx, graph);

  return graph;
};
