import { gql } from 'apollo-server-core';

export default gql`
  type Step {
    id: ID! @aqlKey
    text: String! @defaultValue(value: "")
  }

  extend type Mutation {
    createStep(input: CreateStepInput!): CreateStepResult! @authenticated
    updateStep(input: UpdateStepInput!): UpdateStepResult! @authenticated
    deleteStep(input: DeleteStepInput!): DeleteStepResult! @authenticated
  }

  input CreateStepInput {
    recipeId: ID!
    text: String!
  }

  type CreateStepResult {
    stepEdge: RecipeStepEdge!
      @aqlNewQuery
      @aqlSubquery(query: "LET $field = $parent.stepEdge")
    recipe: Recipe!
      @aqlNewQuery
      @aqlSubquery(query: "LET $field = $parent.recipe")
  }

  input UpdateStepInput {
    id: ID!
    text: String
  }

  type UpdateStepResult {
    step: Step! @aqlNewQuery @aqlSubquery(query: "LET $field = $parent.step")
  }

  input DeleteStepInput {
    id: ID!
  }

  type DeleteStepResult {
    step: Step! @aqlNewQuery @aqlSubquery(query: "LET $field = $parent.step")
    recipe: Recipe!
      @aqlNewQuery
      @aqlSubquery(query: "LET $field = $parent.recipe")
  }
`;
