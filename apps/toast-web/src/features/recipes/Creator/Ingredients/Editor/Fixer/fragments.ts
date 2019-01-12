import gql from 'graphql-tag';

export const recipeIngredient = gql`
  fragment FixRecipeIngredient on RecipeIngredient {
    id
    index
    text
    unit
    unitTextMatch
    value
    valueTextMatch
    ingredientTextMatch
    ingredient {
      id
      name
    }
  }
`;
