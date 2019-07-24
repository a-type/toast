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
      @subquery(
        query: """
        LET group = (

        )
        LET planDay = (

        )
        """
      )
      @cypher(
        match: """
        (:User{id:$context.userId})-[:MEMBER_OF]->(:Group)-[:HAS_NEXT_PLAN_DAY*]->
          (planDay:PlanDay{id:$args.input.planDayId}),
          (recipe:Recipe{id:$args.input.recipeId})
        """
        merge: "(planDay)-[:PLANS_TO_COOK {servings: $args.input.servings, mealName: $args.input.mealName}]->(recipe)"
        return: "planDay"
      )
      @authenticated

    unassignPlanDayCooking(input: UnassignPlanDayCookingInput!): PlanDay!
      @cypher(
        match: """
        (:User{id:$context.userId})-[:MEMBER_OF]->(:Group)-[:HAS_NEXT_PLAN_DAY*]->
          (planDay:PlanDay{id:$args.input.planDayId})-[cookRel:PLANS_TO_COOK {mealName: $args.input.mealName}]->
          (:Recipe)
        """
        delete: "cookRel"
        return: "planDay"
      )
      @authenticated
  }
`;
