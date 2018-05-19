import { gql } from 'apollo-boost';

export const Basic = gql`
  query IngredientBasic($id: ID, $name: String) {
    ingredient(input: { id: $id, name: $name }) {
      id
      name
      description
    }
  }
`;
