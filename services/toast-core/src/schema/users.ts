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
        (($node.published && !$node.private) || ($context.userId && $parent._key == $context.userId))
        """
      )

    """
    Whether or not the authenticated user is following this user
    """
    viewerFollowing: Boolean!
      @authenticated
      @aqlSubquery(
        query: """
        LET viewer = DOCUMENT(Users, $context.userId)
        LET relationship = FIRST(
          FOR followed IN OUTBOUND viewer Following
            FILTER followed._key == $parent._key
            LIMIT 1
            RETURN followed
        )
        """
        return: "relationship != null"
      )

    following(first: Int = 10, after: String): UserFollowingConnection!
      @aqlRelayConnection(
        edgeCollection: "Following"
        edgeDirection: OUTBOUND
        cursorExpression: "$edge.createdAt"
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

  type UserFollowingConnection {
    edges: [UserFollowingEdge!]! @aqlRelayEdges
    pageInfo: UserFollowingPageInfo!
  }

  type UserFollowingEdge {
    cursor: String!
    node: User! @aqlRelayNode
  }

  type UserFollowingPageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  extend type Query {
    """
    Gets the authenticated user. A good starting point for exploring the graph.
    """
    viewer: User!
      @aqlDocument(collection: "Users", key: "$context.userId")
      @authenticated

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

    follow(input: FollowInput!): FollowResult!
      @authenticated
      @aqlSubquery(
        query: """
        LET viewer = DOCUMENT(Users, $context.userId)
        LET user = DOCUMENT(Users, $args.input.userId)
        UPSERT {
          _from: viewer._id,
          _to: user._id
        }
          INSERT {
            _from: viewer._id,
            _to: user._id,
            createdAt: DATE_NOW()
          }
          UPDATE {}
          IN Following
          OPTIONS { waitForSync: true }
        """
        return: "{ user: user }"
      )

    unfollow(input: UnfollowInput!): UnfollowResult!
      @authenticated
      @aqlSubquery(
        query: """
        LET viewer = DOCUMENT(Users, $context.userId)
        LET user = DOCUMENT(Users, $args.input.userId)
        LET edge = FIRST(
          FOR v, e IN OUTBOUND viewer Following
            FILTER v._id == user._id
            LIMIT 1
            RETURN e
        )
        REMOVE edge._key In Following OPTIONS { ignoreErrors: true, waitForSync: true }
        """
        return: "{ user: user }"
      )
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

  input FollowInput {
    userId: ID!
  }

  type FollowResult {
    user: User! @aqlNewQuery @aqlSubquery(query: "LET $field = $parent.user")
  }

  input UnfollowInput {
    userId: ID!
  }

  type UnfollowResult {
    user: User! @aqlNewQuery @aqlSubquery(query: "LET $field = $parent.user")
  }
`;
