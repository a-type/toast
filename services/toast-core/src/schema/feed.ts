import { gql } from 'apollo-server-core';

export default gql`
  type FeedItem {
    recipe: Recipe! @aqlSubquery(query: "LET $field = $parent.recipe")
  }

  type FeedConnection {
    edges: [FeedEdge!]! @aqlRelayEdges
    pageInfo: FeedPageInfo!
  }

  type FeedEdge {
    node: FeedItem! @aqlRelayNode
    cursor: String!
  }

  type FeedPageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  extend type Query {
    feed: FeedConnection!
      @authenticated
      @aqlRelayConnection(
        source: """
        FLATTEN(FOR followed IN OUTBOUND DOCUMENT(Users, $context.userId) Following
          RETURN (FOR recipe IN OUTBOUND followed AuthorOf
            RETURN { recipe }
          )
        )
        """
        cursorExpression: "$node.recipe.createdAt"
      )
  }
`;
