import { gql } from 'apollo-boost';

export const Basic = gql`
  query AuthorBasic($authorId: ID!) {
    author(input: { id: $authorId }) {
      id
      name
      bio
    }
  }
`;
