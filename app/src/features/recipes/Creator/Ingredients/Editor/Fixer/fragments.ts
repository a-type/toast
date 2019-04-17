import gql from 'graphql-tag';

export const recipeIngredient = gql`
  fragment FixRecipeIngredient on RecipeIngredient {
    id
    index
    text
    unit
    unitStart
    unitEnd
    quantity
    quantityStart
    quantityEnd
    ingredientStart
    ingredientEnd
    ingredient {
      id
      name
    }
  }
`;
