import { gql } from 'apollo-boost';

export const Create = gql`
  mutation CreateRecipeIngredient(
    $ingredientId: ID
    $recipeId: ID
    $unit: String
    $unitValue: Float
  ) {
    createRecipeIngredient(
      input: {
        ingredientId: $ingredientId
        recipeId: $recipeId
        unit: $unit
        unitValue: $unitValue
      }
    ) {
      id
      ingredient {
        id
        name
      }
      unit
      unitValue
      index
    }
  }
`;

export const Update = gql`
  mutation UpdateRecipeIngredient(
    $id: ID
    $ingredientId: ID
    $unit: String
    $unitValue: Float
  ) {
    updateRecipeIngredient(
      id: $id
      input: { ingredientId: $ingredientId, unit: $unit, unitValue: $unitValue }
    ) {
      id
      ingredient {
        id
        name
      }
      unit
      unitValue
      index
    }
  }
`;
