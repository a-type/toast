import { gql } from 'apollo-boost';

export const Create = gql`
  mutation CreateStep($text: String!, $recipeId: ID!) {
    createStep(input: { text: $text, recipeId: $recipeId }) {
      id
      recipe {
        id
      }
      text
    }
  }
`;

export const Update = gql`
  mutation UpdateStep($id: ID!, $text: String) {
    updateStep(input: { text: $text }, id: $id) {
      id
      recipe {
        id
      }
      text
    }
  }
`;
