import { gql } from 'apollo-boost';

export const Recipes = gql`
  query SearchRecipes($input: RecipeSearchInput!) {
    searchRecipes(input: $input) {
      total
      items {
        id
        title
        coverImage {
          id
          url
        }
      }
    }
  }
`;

export const Ingredients = gql`
  query SearchIngredients($input: IngredientSearchInput!) {
    searchIngredients(input: $input) {
      total
      items {
        id
        name
      }
    }
  }
`;
