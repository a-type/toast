import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

const CollectionQuery = gql`
  query Collection($input: RecipeCollectionGetInput!) {
    viewer {
      id
      group {
        id
        recipeCollection(input: $input) {
          id
          name
          recipesConnection {
            edges {
              node {
                id
                title
                attribution
                coverImageUrl
                coverImageAttribution
              }
            }
          }
        }
      }
    }
  }
`;

export type RecipeCollectionRecipe = {
  id: string;
  title: string;
  attribution: string;
  coverImageUrl: string;
  coverImageAttribution: string;
};

export type RecipeCollection = {
  id: string;
  name: string;
  recipesConnection: {
    edges: {
      node: RecipeCollectionRecipe;
    }[];
  };
};

export type CollectionQueryResult = {
  viewer: {
    id: string;
    group: {
      id: string;
      recipeCollection: RecipeCollection;
    };
  };
};

export type Pagination = {
  first?: number;
  offset?: number;
};

export default (id: string) =>
  useQuery<
    CollectionQueryResult,
    {
      input: {
        id: string;
      };
    }
  >(CollectionQuery, {
    variables: {
      input: {
        id,
      },
    },
  });
