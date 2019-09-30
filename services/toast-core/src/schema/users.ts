import { gql } from 'apollo-server-core';

export default gql`
  """
  A user in the system
  """
  type User {
    id: ID! @aqlKey
    displayName: String
    photoUrl: String
    bio: String
    coverImageUrl: String

    # TODO authorization!
    """
    You may only view the group associated with your own User
    """
    group: Group
      @aqlNode(
        edgeCollection: "MemberOf"
        direction: OUTBOUND
        filter: "$parent._key == $context.userId"
      )
      @authenticated

    authoredRecipes(first: Int = 10, after: String): UserRecipesConnection!
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

  extend type Query {
    """
    Gets the authenticated user. A good starting point for exploring the graph.
    """
    viewer: User @aqlDocument(collection: "Users", key: "$context.userId")

    """
    Gets a specific user by ID
    """
    user(input: UserGetInput!): User
      @aqlDocument(collection: "Users", key: "$args.input.id")
  }

  input UserGetInput {
    """
    The ID of the user to retrieve
    """
    id: ID!
  }

  extend type Mutation {
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

    updateViewer(input: UpdateUserInput!): UpdateUserResult!
  }

  input UpdateUserInput {
    displayName: String
    bio: String
    photo: Upload
    coverImage: Upload
  }

  type UpdateUserResult {
    user: User! @aqlNewQuery @aqlSubquery(query: "", return: "$parent.user")
  }
`;
