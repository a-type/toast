import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { FullRecipeFragment, FullRecipe } from './fragments';

export const FullRecipeQuery = gql`
  query FullRecipe($recipeId: ID!) {
    recipe(input: { id: $recipeId }) {
      id
      ...FullRecipeFragment
    }
  }

  ${FullRecipeFragment}
`;

export type FullRecipeQueryResult = {
  recipe: FullRecipe;
};

export default (id: string, options: QueryHookOptions = {}) =>
  useQuery<FullRecipeQueryResult, { recipeId: string }>(FullRecipeQuery, {
    ...options,
    variables: {
      recipeId: id,
    },
  });
