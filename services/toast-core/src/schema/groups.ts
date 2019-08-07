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
    planCookingConnection: GroupPlanCookingConnection!
      @aqlRelayConnection(
        edgeCollection: "PlansToCook"
        edgeDirection: OUTBOUND
        cursorProperty: "date"
        cursorOnEdge: true
      )

    """
    Collections of recipes group users have created
    """
    recipeCollectionsConnection: GroupRecipeCollectionConnection!
      @aqlRelayConnection(
        edgeCollection: "HasRecipeCollection"
        edgeDirection: OUTBOUND
        cursorProperty: "_key"
      )

    """
    Gets a specific recipe collection
    """
    recipeCollection(input: RecipeCollectionGetInput!): RecipeCollection
      @aqlNode(
        edgeCollection: "HasRecipeCollection"
        direction: OUTBOUND
        filter: "$field.id == $args.input.id"
        limit: { count: 1 }
      )

    """
    A list of items to purchase for next week's plan
    """
    shoppingList: ShoppingList!
  }

  input RecipeCollectionGetInput {
    id: ID!
  }

  type GroupPlanCookingConnection {
    edges: [GroupPlanCookingEdge!]! @aqlRelayEdges
    pageInfo: GroupPlanCookingPageInfo! @aqlRelayPageInfo
  }

  type GroupPlanCookingEdge {
    cursor: String!
    date: Date!
    mealName: String!
    node: Recipe! @aqlRelayNode
  }

  type GroupPlanCookingPageInfo {
    hasNextPage: Boolean!
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
    group: Group! @aqlDocument(collection: "Groups", id: "$parent.groupId")
  }

  extend type Query {
    viewer: User @aqlDocument(collection: "Users", id: "$context.userId")
  }

  input SetGroceryDayInput {
    groceryDay: Weekday!
  }

  type GroupCreateResult {
    group: Group! @aql(expression: "$parent.group")
  }

  type GroupSetGroceryDayResult {
    group: Group! @aql(expression: "$parent.group")
  }

  type AddPlanToCookInput {
    date: Date!
    mealName: String!
    recipeId: String!
  }

  type RemovePlanToCookInput {
    date: Date!
    mealName: String!
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
        LET $field = NEW
        """
      )
      @authenticated

    createGroup: GroupCreateResult!
      @aqlSubquery(
        query: """
        LET user = DOCUMENT(Users, $context.userId)
        LET group = (
          INSERT {groceryDay: 0} INTO Groups
          RETURN NEW
        )
        LET edge = (
          INSERT {_from: user, _to: group} INTO MemberOf
        )
        RETURN {
          group: group
        }
        """
      )
      @authenticated

    setGroceryDay(input: SetGroceryDayInput!): Group
      @aqlSubquery(
        query: """
        LET group = (
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

    addPlanToCook(input: AddPlanToCookInput!): Group!
      @aqlSubquery(
        query: """
        LET group = (
          FOR group_0 IN DOCUMENT(Users, $context.userId) MemberOf
            LIMIT 1
            RETURN group_0
        )
        LET recipe = DOCUMENT(Recipes, $args.input.recipeId)
        INSERT {
          date: $args.input.date,
          mealName: $args.input.mealName,
          _from: group,
          _to: recipe
        } INTO PlansToCook
        """
        return: "group"
      )
      @authenticated

    removePlanToCook(input: RemovePlanToCookInput!): Group!
      @aqlSubquery(
        query: """
        LET group = (
          FOR group_0 IN DOCUMENT(Users, $context.userId) MemberOf
            LIMIT 1
            RETURN group_0
        )
        LET cookEdge = FIRST(
          FOR n, e IN OUTBOUND group PlansToCook
            PRUNE e.date == $args.input.date && e.mealName == $args.input.mealName
            LIMIT 1
            RETURN e
        )
        REMOVE cookEdge in PlansToCook
        RETURN group
        """
      )
      @authenticated
  }
`;
