import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Step {
    id: ID!
    text: String!
  }
`;

export const resolvers = {};
