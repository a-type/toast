import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const RecipeCollectionQuery = gql`
  query RecipeCollection {
    me {
      id
      authoredRecipes {
        ...RecipeFragment
      }
      discoveredRecipes {
        ...RecipeFragment
      }
      draftRecipes {
        ...RecipeFragment
      }
      likedRecipes {
        ...RecipeFragment
      }
    }
  }

  fragment RecipeFragment on Recipe {
    id
    title
    coverImage {
      id
      url
    }
  }
`;

type RecipeFragmentResult = {
  id: string;
  title: string;
  coverImage?: {
    id: string;
    url: string;
  };
};

type RecipeCollections = {
  authoredRecipes: RecipeFragmentResult[];
  discoveredRecipes: RecipeFragmentResult[];
  draftRecipes: RecipeFragmentResult[];
  likedRecipes: RecipeFragmentResult[];
};

type RecipeCollectionQueryResult = {
  me: RecipeCollections & { id: string };
};

export default (): [
  RecipeCollections,
  boolean,
  ApolloError,
  QueryHookResult<RecipeCollectionQueryResult, {}>
] => {
  const result = useQuery<RecipeCollectionQueryResult>(RecipeCollectionQuery);

  const authoredRecipes = pathOr([], ['me', 'authoredRecipes'], result.data);
  const discoveredRecipes = pathOr(
    [],
    ['me', 'discoveredRecipes'],
    result.data,
  );
  const draftRecipes = pathOr([], ['me', 'draftRecipes'], result.data);
  const likedRecipes = pathOr([], ['me', 'likedRecipes'], result.data);

  return [
    {
      authoredRecipes,
      discoveredRecipes,
      draftRecipes,
      likedRecipes,
    },
    result.loading,
    result.error,
    result,
  ];
};
