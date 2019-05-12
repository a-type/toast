import { gql } from 'apollo-server-express';
import { neo4jgraphql } from 'neo4j-graphql-js';

export const typeDefs = gql`
  type RecipeStep {
    id: ID!
    index: Int!
    text: String!
  }

  input RecipeStepCreateInput {
    text: String!
  }

  input RecipeStepUpdateInput {
    recipeStepId: ID!
    text: String
  }

  extend type Recipe {
    steps: [RecipeStep!]! @relation(name: "STEP_OF", direction: "IN")
  }

  extend type Mutation {
    updateRecipeStep(input: RecipeStepUpdateInput!): RecipeStep!
      @authenticated
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:AUTHOR_OF]->(:Recipe)<-[:STEP_OF]-(step:RecipeStep{id:$input.recipeStepId})
        SET step.text = $input.text
        RETURN step
        """
      )
    createRecipeStep(recipeId: ID!, input: RecipeStepCreateInput!): RecipeStep!
      @authenticated
      @generateId(type: "recipeStep")
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:AUTHOR_OF]->(recipe:Recipe{id:$recipeId})
        CREATE (step:RecipeStep {id:$id})
        CREATE (recipe)<-[:STEP_OF]-(step)
        SET step += $input
        WITH recipe, step
        MATCH (recipe)<-[:STEP_OF]-(allStep:RecipeStep)
        WITH step, count(allStep) as stepCount
        SET step.index = stepCount - 1
        RETURN step
        """
      )
    deleteRecipeStep(id: ID!): RecipeStep!
      @authenticated
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:AUTHOR_OF]->(:Recipe)<-[:STEP_OF]-(step:RecipeStep{id:$id})
        WITH step, step.id as stepId
        DETACH DELETE step
        RETURN {id: stepId, index: 0, text: 'Deleted'}
        """
      )
  }
`;

export const resolvers = {
  Mutation: {
    updateRecipeStep: neo4jgraphql,
    createRecipeStep: neo4jgraphql,
    deleteRecipeStep: neo4jgraphql,
  },
};
