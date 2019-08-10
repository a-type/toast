import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const DraftRecipeQuery = gql`
  query DraftRecipes {
    viewer {
      id
      authoredRecipesConnection(input: { published: false }) {
        nodes {
          id
          title
          published
          coverImageUrl
        }
      }
    }
  }
`;

export type DraftRecipe = {
  id: string;
  title: string;
  published: string;
  coverImageUrl: string;
};

export type DraftRecipeQueryResult = {
  viewer: {
    id: string;
    authoredRecipesConnection: DraftRecipe[];
  };
};

export default (): [
  DraftRecipe[],
  boolean,
  ApolloError,
  QueryHookResult<DraftRecipeQueryResult, any>
] => {
  const result = useQuery<DraftRecipeQueryResult>(DraftRecipeQuery);

  const recipes = pathOr(
    [],
    ['viewer', 'authoredRecipesConnection'],
    result.data,
  );

  return [recipes, result.loading, result.error, result];
};
