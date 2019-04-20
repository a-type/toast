import gql from 'graphql-tag';
import { FullRecipe } from 'generated/schema';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

export const FullRecipeQuery = gql`
  query FullRecipe($recipeId: ID!) {
    recipe(id: $recipeId) {
      id
      title
      description
      attribution
      sourceUrl
      published
      displayType
      ingredients {
        id
        unit
        unitStart
        unitEnd
        quantity
        quantityStart
        quantityEnd
        text
        ingredientStart
        ingredientEnd
        comments
        preparations
        ingredient {
          id
          name
        }
      }
      steps {
        id
        step {
          id
          text
        }
      }
      coverImage {
        id
        url
        attribution
      }
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
  displayType: 'LINK' | 'FULL';
  ingredients: {
    id: string;
    unit?: string;
    unitStart?: number;
    unitEnd?: number;
    quantity: number;
    quantityStart?: number;
    quantityEnd?: number;
    text: string;
    ingredientStart?: number;
    ingredientEnd?: number;
    comments: string[];
    preparations: string[];
    ingredient: {
      id: string;
      name: string;
    };
  }[];
  steps: {
    id: string;
    step: {
      id: string;
      text: string;
    };
  }[];
  coverImage?: {
    id: string;
    url: string;
    attribution: string;
  };
  author?: {
    id: string;
  };
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
