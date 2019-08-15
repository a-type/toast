import { gql } from 'apollo-server-core';

export default gql`
  type PlanMeal {
    id: ID! @aqlKey
    date: Date!
    mealName: String!
    servings: Int! @defaultValue(value: 1)
    note: String
    cooking: Recipe @aqlNode(edgeCollection: "PlansToCook", direction: OUTBOUND)
  }

  input AddPlanMealInput {
    date: Date!
    mealName: String!
    recipeId: String
    note: String
    servings: Int
  }

  type AddPlanMealPayload {
    planMealEdge: GroupPlanMealsEdge!
      @aqlSubquery(query: "LET $field = $parent.planMealEdge")
  }

  input RemovePlanMealInput {
    id: ID!
  }

  type RemovePlanMealPayload {
    planMeal: PlanMeal! @aqlSubquery(query: "LET $field = $parent.planMeal")
    group: Group!
  }

  extend type Mutation {
    addPlanMeal(input: AddPlanMealInput!): AddPlanMealPayload!
      @aqlSubquery(
        query: """
        LET user = DOCUMENT(Users, $context.userId)
        LET group = FIRST(
          FOR group_0 IN OUTBOUND user MemberOf
            LIMIT 1
            RETURN group_0
        )
        LET recipe = DOCUMENT(Recipes, $args.input.recipeId)
        LET planMeal = FIRST(
          INSERT {
            date: $args.input.date,
            mealName: $args.input.mealName,
            servings: $args.input.servings,
            note: $args.input.note
          } INTO PlanMeals
          RETURN NEW
        )
        LET groupEdge = FIRST(
          INSERT {
            _from: group._id,
            _to: planMeal._id
          } INTO HasPlanMeal
          RETURN NEW
        )
        INSERT {
          _from: planMeal._id,
          _to: recipe._id
        } INTO PlansToCook
        LET $field = {
          planMealEdge: MERGE(groupEdge, { cursor: CONCAT(planMeal.date, planMeal.mealName), node: planMeal })
        }
        """
      )
      @authenticated

    removePlanMeal(input: RemovePlanMealInput!): RemovePlanMealPayload!
      @aqlSubquery(
        query: """
        LET group = FIRST(
          FOR group_0 IN OUTBOUND DOCUMENT(Users, $context.userId) MemberOf
            LIMIT 1
            RETURN group_0
        )
        LET found = FIRST(
          FOR n, e IN OUTBOUND group HasPlanMeal
            FILTER n._key == $args.input.id
            LIMIT 1
            RETURN { planMeal: n, mealEdge: e }
        )
        LET cookEdge = FIRST(
          FOR n, e IN OUTBOUND found.planMeal PlansToCook
            LIMIT 1
            RETURN e
        )
        REMOVE found.mealEdge in HasPlanMeal
        REMOVE cookEdge in PlansToCook
        REMOVE found.planMeal in PlanMeals
        LET $field = {
          group: group,
          planMeal: found.planMeal
        }
        """
      )
      @authenticated
  }
`;
