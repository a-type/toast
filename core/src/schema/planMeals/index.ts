import { gql } from 'apollo-server-express';
import { Context } from 'context';
import { NotFoundError } from 'errors';
import logger from 'logger';
import { neo4jgraphql } from 'neo4j-graphql-js';

export const typeDefs = gql`
  type PlanMealCookingEdge
    @relation(name: "PLANS_TO_COOK", from: "PlanMeal", to: "Recipe") {
    servings: Int!
    meal: PlanMeal!
    recipe: Recipe!
  }

  type PlanMeal {
    id: ID!
    note: String

    cooking: [PlanMealCookingEdge!]!
    eating: [PlanMeal!]! @relation(name: "PLANS_TO_EAT", direction: "OUT")
  }

  input AssignPlanMealRecipeInput {
    planMealId: ID!
    recipeId: ID!
    servings: Int!
  }

  input AssignPlanMealEatingInput {
    planMealId: ID!
    eatingPlanMealId: ID!
  }

  extend type PlanDay {
    breakfast: PlanMeal!
      @cypher(
        statement: """
        MATCH (this)-[:HAS_PLAN_MEAL{meal:'breakfast'}]->(m:PlanMeal) RETURN m
        """
      )
    lunch: PlanMeal!
      @cypher(
        statement: """
        MATCH (this)-[:HAS_PLAN_MEAL{meal:'lunch'}]->(m:PlanMeal) RETURN m
        """
      )
    dinner: PlanMeal!
      @cypher(
        statement: """
        MATCH (this)-[:HAS_PLAN_MEAL{meal:'dinner'}]->(m:PlanMeal) RETURN m
        """
      )
  }

  extend type Mutation {
    assignPlanMealRecipe(input: AssignPlanMealRecipeInput!): PlanMeal!
      @authenticated
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:MEMBER_OF]->(:Group)-[:HAS_PLAN_DAY]->(:PlanDay)-[:HAS_PLAN_MEAL]->(planMeal:PlanMeal{id:$input.planMealId}),
          (recipe:Recipe{id:$input.recipeId})
        OPTIONAL MATCH (planMeal)-[oldRel:PLANS_TO_COOK]->()
        DELETE oldRel
        MERGE (planMeal)-[:PLANS_TO_COOK {servings: $input.servings}]->(recipe)
        RETURN planMeal
        """
      )
    assignPlanMealEating(input: AssignPlanMealEatingInput!): PlanMeal!
      @authenticated
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:MEMBER_OF]->(:Group)-[:HAS_PLAN_DAY]->(:PlanDay)-[:HAS_PLAN_MEAL]->(planMeal:PlanMeal{id:$input.planMealId}),
          (eating:PlanMeal{id:$input.eatingPlanMealId})
        MERGE (planMeal)-[:PLANS_TO_EAT]->(eating)
        RETURN planMeal
        """
      )
  }
`;

export const resolvers = {
  Mutation: {
    assignPlanMealRecipe: neo4jgraphql,
    assignPlanMealEating: neo4jgraphql,
  },

  PlanDay: {
    breakfast: parent => {
      return parent.breakfast[0];
    },
    lunch: parent => {
      return parent.lunch[0];
    },
    dinner: parent => {
      return parent.dinner[0];
    },
  },

  PlanMealCookingEdge: {
    servings: parent => parent.servings || 1,
  },
};
