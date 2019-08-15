import { gql } from 'apollo-server-core';

export default gql`
  # Users and groups

  """
  A user in the system
  """
  type User {
    id: ID! @aqlKey
    displayName: String
    photoUrl: String

    """
    You may only view the group associated with your own User
    """
    group: Group
      @aqlNode(edgeCollection: "MemberOf", direction: OUTBOUND)
      @authenticated
  }

  """
  One of the primary resources in meal planning, a Group is the container for plan information for one
  or more Users.
  """
  type Group {
    id: ID! @aqlKey
    groceryDay: Weekday!

    """
    Returns the available planned meals of the group's meal plan
    """
    planMealsConnection(
      first: Int = 10
      after: String
    ): GroupPlanMealsConnection!
      @aqlRelayConnection(
        edgeCollection: "HasPlanMeal"
        edgeDirection: OUTBOUND
        cursorExpression: "CONCAT($node.date, $node.mealName)"
      )

    """
    Collections of recipes group users have created
    """
    recipeCollectionsConnection(
      first: Int = 10
      after: String
    ): GroupRecipeCollectionConnection!
      @aqlRelayConnection(
        edgeCollection: "HasRecipeCollection"
        edgeDirection: OUTBOUND
      )

    """
    Gets a specific recipe collection
    """
    recipeCollection(input: RecipeCollectionGetInput!): RecipeCollection
      @aqlNode(
        edgeCollection: "HasRecipeCollection"
        direction: OUTBOUND
        filter: "$field._key == $args.input.id"
        limit: { count: 1 }
      )
  }

  input RecipeCollectionGetInput {
    id: ID!
  }

  type GroupPlanMealsConnection {
    edges: [GroupPlanMealsEdge!]! @aqlRelayEdges
    pageInfo: GroupPlanMealsPageInfo! @aqlRelayPageInfo
  }

  type GroupPlanMealsEdge {
    cursor: String!
    node: PlanMeal! @aqlRelayNode
  }

  type GroupPlanMealsPageInfo {
    hasNextPage: Boolean!
  }

  type PlanMeal {
    id: ID! @aqlKey
    date: Date!
    mealName: String!
    servings: Int! @defaultValue(value: 1)
    note: String
    cooking: Recipe @aqlNode(edgeCollection: "PlansToCook", direction: OUTBOUND)
  }

  type GroupRecipeCollectionConnection {
    edges: [GroupRecipeCollectionEdge!]! @aqlRelayEdges
    pageInfo: GroupRecipeCollectionPageInfo! @aqlRelayPageInfo
  }

  type GroupRecipeCollectionEdge {
    cursor: String!
    node: RecipeCollection! @aqlRelayNode
  }

  type GroupRecipeCollectionPageInfo {
    hasNextPage: Boolean!
  }

  type GroupInvitationAcceptResult {
    group: Group! @aqlDocument(collection: "Groups", key: "$parent.groupId")
  }

  extend type Query {
    viewer: User @aqlDocument(collection: "Users", key: "$context.userId")
  }

  input SetGroceryDayInput {
    groceryDay: Weekday!
  }

  type GroupCreateResult {
    group: Group! @aqlSubquery(query: "LET $field = $parent.group")
  }

  type GroupSetGroceryDayResult {
    group: Group! @aqlSubquery(query: "LET $field = $parent.group")
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
    date: Date!
    mealName: String!
  }

  type RemovePlanMealPayload {
    planMeal: PlanMeal! @aqlSubquery(query: "LET $field = $parent.planMeal")
    group: Group!
  }

  extend type Mutation {
    # users and groups

    """
    Idempotent operation that merges a new user into the graph based on the currently authenticated
    user info.
    """
    mergeUser: User!
      @aqlSubquery(
        query: """
        UPSERT {_key: $context.userId}
          INSERT {_key: $context.userId}
          UPDATE {}
        IN Users
        """
        return: "NEW"
      )
      @authenticated

    createGroup: GroupCreateResult!
      @aqlSubquery(
        query: """
        LET user = DOCUMENT(Users, $context.userId)
        LET group = FIRST(
          INSERT {groceryDay: 0} INTO Groups
          RETURN NEW
        )
        LET edge = FIRST(
          INSERT {_from: user._id, _to: group._id} INTO MemberOf
        )
        LET $field = {
          group: group
        }
        """
      )
      @authenticated

    setGroceryDay(input: SetGroceryDayInput!): Group
      @aqlSubquery(
        query: """
        LET group = FIRST(
          FOR group_0 IN DOCUMENT(Users, $context.userId) MemberOf
            LIMIT 1
            RETURN group_0
        )
        UPDATE {_key: group._key, groceryDay: $args.input.groceryDay} IN Groups
        $field = NEW
        """
      )
      @authenticated

    createGroupInvitation: String! @authenticated
    acceptGroupInvitation(id: String!): GroupInvitationAcceptResult
      @authenticated

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
          FOR group_0 IN DOCUMENT(Users, $context.userId) MemberOf
            LIMIT 1
            RETURN group_0
        )
        LET found = FIRST(
          FOR n, e IN OUTBOUND group HasPlanMeal
            PRUNE n.date == $args.input.date && n.mealName == $args.input.mealName
            LIMIT 1
            RETURN { planMeal: n, mealEdge: e }
        )
        REMOVE found.mealEdge in HasPlanMeal
        LET cookEdge = FIRST(
          FOR n, e IN OUTBOUND found.planMeal PlansToCook
            LIMIT 1
            RETURN e
        )
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
