import { gql } from 'apollo-server-core';

export default gql`
  # Users and groups

  """
  A user in the system
  """
  type User {
    id: ID!
    displayName: String
    photoUrl: String

    """
    You may only view the group associated with your own User
    """
    group: Group

    authoredRecipesConnection(
      input: UserAuthoredRecipesConnectionInput = { published: Published }
    ): UserAuthoredRecipesConnection!
  }

  enum RecipePublishedStateFilter {
    Published
    Unpublished
    Any
  }

  input UserAuthoredRecipesConnectionInput {
    published: RecipePublishedStateFilter
  }

  type UserAuthoredRecipesConnection @cypherVirtual {
    edges: [UserAuthoredRecipesEdge!]!
      @cypherRelationship(
        type: "AUTHOR_OF"
        direction: OUT
        where: """
        $virtual.input.published = 'Any' OR
        ($virtual.input.published = 'Published' AND coalesce(node.published, false)) OR
        ($virtual.input.published = 'Unpublished' AND NOT coalesce(node.published, false))
        """
      )
  }

  type UserAuthoredRecipesEdge {
    node: Recipe! @cypherNode(relationship: "AUTHOR_OF", direction: OUT)
  }

  """
  One of the primary resources in meal planning, a Group is the container for plan information for one
  or more Users.
  """
  type Group {
    id: ID!
    groceryDay: Weekday!

    """
    Returns the available planned meals of the group's meal plan
    """
    planDaysConnection: GroupPlanDayConnection!

    """
    Get a specific plan day by ID
    """
    planDay(input: PlanDayGetInput!): PlanDay
      @cypherNode(
        relationship: "HAS_PLAN_DAY"
        direction: "OUT"
        where: "node.id = $args.input.id"
      )

    """
    Collections of recipes group users have created
    """
    recipeCollectionsConnection: GroupRecipeCollectionConnection!

    """
    Gets a specific recipe collection
    """
    recipeCollection(input: RecipeCollectionGetInput!): RecipeCollection
      @cypherNode(
        relationship: "HAS_COLLECTION"
        direction: "OUT"
        where: "node.id = $args.input.id"
      )

    """
    A list of items to purchase for next week's plan
    """
    shoppingList: ShoppingList! @cypherSkip
  }

  input PlanDayGetInput {
    id: ID!
  }

  input RecipeCollectionGetInput {
    id: ID!
  }

  type GroupPlanDayConnection @cypherVirtual {
    nodes: [PlanDay!]! @cypherLinkedNodes(relationship: "HAS_NEXT_PLAN_DAY")
  }

  type GroupRecipeCollectionConnection @cypherVirtual {
    edges: [GroupRecipeCollectionEdge!]!
      @cypherRelationship(type: "HAS_COLLECTION", direction: OUT)
  }

  type GroupRecipeCollectionEdge {
    node: RecipeCollection!
      @cypherNode(relationship: "HAS_COLLECTION", direction: OUT)
  }

  type GroupInvitationAcceptResult {
    group: Group!
      @cypher(match: "(group:Group{id: parent.groupId})", return: "group")
  }

  extend type Query {
    me: User @cypher(match: "(user:User{id:$context.userId})", return: "user")

    """
    Group functions as a Viewer node; it is the starting point for most queries.
    """
    group: Group
      @cypher(
        match: "(user:User{id:$context.userId})-[:MEMBER_OF]->(group:Group)"
        return: "group"
      )
      @authenticated
  }

  input SetGroceryDayInput {
    groceryDay: Weekday!
  }

  extend type Mutation {
    # users and groups

    """
    Idempotent operation that merges a new user into the graph based on the currently authenticated
    user info.
    """
    mergeUser: User!
      @cypher(merge: "(user:User {id: $context.userId})", return: "user")
      @authenticated

    createGroup: Group!
      @cypher(
        match: "(user:User {id: $context.userId})"
        create: "(user)-[:MEMBER_OF]->(group:Group {id: $args.id, groceryDay: 0})"
        return: "group"
      )
      @authenticated
      @generateSlug(type: "group")

    setGroceryDay(input: SetGroceryDayInput!): Group
      @cypher(
        match: "(:User {id: $context.userId})-[:MEMBER_OF]->(group:Group)"
        set: "group.groceryDay = $args.input.groceryDay"
        return: "group"
      )
      @authenticated

    createGroupInvitation: String! @authenticated
    acceptGroupInvitation(id: String!): GroupInvitationAcceptResult
      @authenticated
  }
`;
