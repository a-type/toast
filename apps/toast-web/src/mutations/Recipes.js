import { gql } from 'apollo-boost';

export const Create = gql`
  mutation CreateRecipe($title: String!, $description: String) {
    createRecipe(input: { title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;

export const Update = gql`
  mutation UpdateRecipe($id: ID!, $title: String, $description: String) {
    updateRecipe(input: { title: $title, description: $description }, id: $id) {
      id
      title
      description
    }
  }
`;
