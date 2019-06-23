import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

export const FullRecipeQuery = gql`
  query FullRecipe($recipeId: ID!) {
    recipe(input: { id: $recipeId }) {
      id
      title
      description
      attribution
      sourceUrl
      published
      servings
      coverImageUrl
      coverImageAttribution
      ingredientsConnection {
        nodes {
          id
          unit
          unitStart
          unitEnd
          quantity
          quantityStart
          quantityEnd
          text
          foodStart
          foodEnd
          comments
          preparations
          food {
            id
            name
          }
        }
      }
      steps
      # author {
      #   id
      # }
    }
  }
`;

export type FullRecipe = {
  id: string;
  published: boolean;
  title: string;
  description: string;
  sourceUrl: string;
  attribution: string;
  coverImageUrl: string;
  coverImageAttribution: string;
  ingredientsConnection: {
    nodes: {
      id: string;
      unit?: string;
      unitStart?: number;
      unitEnd?: number;
      quantity: number;
      quantityStart?: number;
      quantityEnd?: number;
      text: string;
      foodStart?: number;
      foodEnd?: number;
      comments: string[];
      preparations: string[];
      food: {
        id: string;
        name: string;
      };
    }[];
  };
  steps: string[];
  // author?: {
  //   id: string;
  // };
};

export type FullRecipeData = {
  recipe: FullRecipe;
};

export default (
  id: string,
): [
  FullRecipe,
  boolean,
  ApolloError,
  QueryHookResult<FullRecipeData, { recipeId: string }>
] => {
  const result = useQuery<FullRecipeData, { recipeId: string }>(
    FullRecipeQuery,
    {
      variables: {
        recipeId: id,
      },
    },
  );
  const { data, loading, error } = result;

  return [pathOr(null, ['recipe'], data), loading, error, result];
};
