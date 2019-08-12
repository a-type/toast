import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
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
        edges {
          cursor
          node {
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
    edges: {
      cursor: string;
      node: {
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

export default (id: string) =>
  useQuery<FullRecipeData, { recipeId: string }>(FullRecipeQuery, {
    variables: {
      recipeId: id,
    },
  });
