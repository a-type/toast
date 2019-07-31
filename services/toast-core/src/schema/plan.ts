import { gql } from 'apollo-server-core';

export default gql`
  type PlanDay {
    id: ID!
    date: Date!

    cookingConnection: PlanDayCookingRecipeConnection!
      @relayConnection(
        edgeCollection: "Cooking"
        edgeDirection: OUTBOUND
        cursorProperty: "createdAt"
      )
  }

  type PlanDayCookingRecipeConnection {
    edges: [PlanDayCookingRecipeEdge!]! @relayEdge
    pageInfo: PlanDayCookingRecipePageInfo! @relayPageInfo
  }

  type PlanDayCookingRecipeEdge {
    servings: Int!
    mealName: String!
    cursor: String!

    node: Recipe! @relayNode
  }

  type PlanDayCookingRecipePageInfo {
    hasNextPage: Boolean!
  }

  input AssignPlanDayCookingInput {
    planDayId: ID!
    mealName: String!
    recipeId: ID!
    servings: Int!
  }

  input UnassignPlanDayCookingInput {
    planDayId: ID!
    mealName: String!
  }

  type AssignPlanDayCookingResult {
    planDay: PlanDay! @aql(expression: "$parent.planDay")
  }

  type UnassignPlanDayCookingResult {
    planDay: PlanDay! @aql(expression: "$parent.planDay")
  }

  extend type Mutation {
    assignPlanDayCooking(input: AssignPlanDayCookingInput!): PlanDay!
      @aqlSubquery(
        query: """
        LET group = FIRST(
          FOR user_group IN DOCUMENT(Users, $context.userId) MemberOf
            LIMIT 1
            RETURN user_group
        )
        LET planDay = FIRST(
          FOR group_planDay IN 1 group HasNextPlanDay
            FILTER group_planDay._key == input.planDayId
            LIMIT 1
            RETURN group_planDay
        )
        LET recipe = DOCUMENT(Recipes, $args.input.recipeId)
        INSERT { _from: planDay, _to: recipe } INTO Cooking
        """
        return: "planDay"
      )
      @authenticated

    unassignPlanDayCooking(input: UnassignPlanDayCookingInput!): PlanDay!
      @aqlSubquery(
        query: """
        LET group = FIRST(
          FOR user_group IN DOCUMENT(Users, $context.userId) MemberOf
            LIMIT 1
            RETURN user_group
        )
        LET planDay = FIRST(
          FOR group_planDay IN 1 group HasNextPlanDay
            FILTER group_planDay._key == input.planDayId
            LIMIT 1
            RETURN group_planDay
        )
        LET cookingEdge = FIRST(
          FOR cooking_recipe, planDay_cookingEdge IN planDay Cooking
            FILTER planDay_cookingEdge.mealName == $args.input.mealName
            LIMIT 1
        )
        REMOVE cookingEdge IN Cooking
        """
        return: "planDay"
      )
      @authenticated
  }
`;
