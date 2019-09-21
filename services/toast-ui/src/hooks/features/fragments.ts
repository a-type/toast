import gql from 'graphql-tag';

export const FullRecipeFragment = gql`
  fragment FullRecipeFragment on Recipe {
    id
    title
    introduction
    description
    attribution
    sourceUrl
    published
    servings
    cookTime
    prepTime
    unattendedTime
    private
    published
    coverImageUrl
    coverImageAttribution
    ingredientsConnection {
      edges {
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
  }
`;

export type FullRecipe = {
  id: string;
  published: boolean;
  title: string;
  introduction: string | null;
  description: string | null;
  servings: number;
  cookTime: number;
  prepTime: number;
  unattendedTime: number;
  private: boolean;
  sourceUrl: string | null;
  attribution: string | null;
  coverImageUrl: string | null;
  coverImageAttribution?: string;
  ingredientsConnection: {
    edges: {
      node: FullRecipeIngredient;
    }[];
  };
  steps: string[];
};

export type FullRecipeIngredient = {
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