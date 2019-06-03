import { gql } from 'apollo-server-core';

export default gql`
  scalar Date
  scalar Weekday
  scalar Upload

  type Query {
    foo: Boolean
  }

  type Mutation {
    ping: String
  }
`;
