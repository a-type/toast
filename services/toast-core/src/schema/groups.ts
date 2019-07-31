import { gql } from 'apollo-server-core';

export default gql`
  # Users and groups

  """
  A user in the system
  """
  type User {
    id: ID! @key
    displayName: String
    photoUrl: String

    """
    You may only view the group associated with your own User
    """
    group: Group
      @node(edgeCollection: "MemberOf", direction: OUTBOUND)
      @authenticated

    authoredRecipesConnection(
      first: Int = 10
      after: String
    ): UserAuthoredRecipesConnection!
      @relayConnection(
        edgeCollection: "AuthorOf"
        direction: OUTBOUND
        cursorProperty: "createdAt"
      )
  }

  type UserAuthoredRecipesConnection {
    edges: [UserRecipeEdge!]! @relayEdges
    pageInfo: UserRecipePageInfo! @relayPageInfo
  }

  type UserRecipeEdge {
    cursor: String!
    node: Recipe! @relayNode
  }

  type UserRecipePageInfo {
    hasNextPage: Boolean!
  }

  """
  One of the primary resources in meal planning, a Group is the container for plan information for one
  or more Users.
  """
  type Group {
    id: ID! @key
    groceryDay: Weekday!

    """
    Returns the available planned meals of the group's meal plan
    """
    planDaysConnection: GroupPlanDayConnection!
      @relayConnection(
        edgeCollection: "HasNextPlanDay"
        edgeDirection: OUTBOUND
        cursorProperty: "date"
        linkedList: true
      )

    """
    Collections of recipes group users have created
    """
    recipeCollectionsConnection: GroupRecipeCollectionConnection!
      @relayConnection(
        edgeCollection: "HasRecipeCollection"
        edgeDirection: OUTBOUND
        cursorProperty: "_key"
      )

    """
    Gets a specific recipe collection
    """
    recipeCollection(input: RecipeCollectionGetInput!): RecipeCollection
      @node(
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

  type GroupPlanDayConnection {
    edges: [GroupPlanDayEdge!]! @relayEdges
    pageInfo: GroupPlanDayPageInfo! @relayPageInfo
  }

  type GroupPlanDayEdge {
    cursor: String!
    node: PlanDay! @relayNode
  }

  type GroupPlanDayPageInfo {
    hasNextPage: Boolean!
  }

  type GroupRecipeCollectionConnection {
    edges: [GroupRecipeCollectionEdge!]! @relayEdges
    pageInfo: GroupRecipeCollectionPageInfo! @relayPageInfo
  }

  type GroupRecipeCollectionEdge {
    cursor: String!
    node: RecipeCollection! @relayNode
  }

  type GroupRecipeCollectionPageInfo {
    hasNextPage: Boolean!
  }

  type GroupInvitationAcceptResult {
    group: Group! @document(collection: "Groups", id: "$parent.groupId")
  }

  extend type Query {
    viewer: User @document(collection: "Users", id: "$context.userId")
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
  }
`;
