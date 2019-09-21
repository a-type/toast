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

    # TODO authorization!
    """
    You may only view the group associated with your own User
    """
    group: Group
      @aqlNode(edgeCollection: "MemberOf", direction: OUTBOUND)
      @authenticated

    authoredRecipes: UserRecipesConnection!
      @aqlRelayConnection(
        edgeCollection: "AuthorOf"
        edgeDirection: OUTBOUND
        cursorExpression: "$node.createdAt"
        filter: """
        ($node.published && $node.public) || ($context.userId && $parent._key == $context.userId)
        """
      )
  }

  type UserRecipesConnection {
    edges: [UserRecipeEdge!]! @aqlRelayEdges
    pageInfo: UserRecipePageInfo!
  }

  type UserRecipeEdge {
    cursor: String!
    node: Recipe! @aqlRelayNode
  }

  type UserRecipePageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  """
  One of the primary resources in meal planning, a Group is the container for plan information for one
  or more Users.
  """
  type Group {
    id: ID! @aqlKey
    groceryDay: Weekday!

    """
    The date your subscription officially expires, if the group is subscribed. Services may extend
    for a grace period after expiration before terminating.
    """
    subscriptionExpiresAt: Date

    """
    Returns the available planned meals of the group's meal plan
    """
    planMealsConnection(
      first: Int = 10
      after: String
      filter: GroupPlanMealsFilterInput
    ): GroupPlanMealsConnection!
      @aqlNewQuery
      @aqlRelayConnection(
        edgeCollection: "HasPlanMeal"
        edgeDirection: OUTBOUND
        cursorExpression: "CONCAT($node.date, $node.mealName)"
        filter: """
        ($args['filter'] == null || (
          $args['filter'].dateBefore == null || $node.date < $args['filter'].dateBefore
        ) && (
          $args['filter'].dateAfter == null || $node.date > $args['filter'].dateAfter
        ))
        """
      )
      @subscribed

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

  input GroupPlanMealsFilterInput {
    dateBefore: Date
    dateAfter: Date
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
    startCursor: String
    endCursor: String
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

  extend type Query {
    viewer: User @aqlDocument(collection: "Users", key: "$context.userId")
  }

  input SetGroceryDayInput {
    groceryDay: Weekday!
  }

  type GroupCreateResult {
    group: Group! @aqlNewQuery @aqlSubquery(query: "LET $field = $parent.group")
  }

  type GroupSetGroceryDayPayload {
    group: Group! @aqlNewQuery @aqlSubquery(query: "LET $field = $parent.group")
  }

  type AcceptGroupInvitationPayload {
    group: Group! @aqlNewQuery @aqlSubquery(query: "LET $field = $parent.group")
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
        UPSERT { _key: $context.userId }
          INSERT { _key: $context.userId }
          UPDATE {}
          IN Users
        LET user = NEW
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

    setGroceryDay(input: SetGroceryDayInput!): GroupSetGroceryDayPayload
      @aqlSubquery(
        query: """
        LET group = FIRST(
          FOR group_0 IN DOCUMENT(Users, $context.userId) MemberOf
            LIMIT 1
            RETURN group_0
        )
        UPDATE {_key: group._key, groceryDay: $args.input.groceryDay} IN Groups
        $field = {
          group: NEW
        }
        """
      )
      @subscribed

    # these use custom resolvers
    createGroupInvitation: String! @subscribed
    acceptGroupInvitation(key: String!): AcceptGroupInvitationPayload!
      @authenticated
  }
`;
