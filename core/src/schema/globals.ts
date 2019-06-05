import { gql } from 'apollo-server-core';

export default gql`
  scalar Date
  scalar Weekday
  scalar Upload
  scalar Any

  type Query {
    foo: Boolean
  }

  type Mutation {
    ping: String
  }
`;
