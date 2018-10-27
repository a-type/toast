import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { SearchRecipes } from 'generated/schema';

export const Document = gql`
  query SearchRecipes($input: RecipeSearchInput!) {
    searchRecipes(input: $input) {
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

interface SearchRecipesQueryProps {
  variables?: SearchRecipes.Variables;
  skip?: boolean;
  children(
    result: QueryResult<SearchRecipes.Query, SearchRecipes.Variables>,
  ): React.ReactNode;
}

const SearchRecipesQuery: React.SFC<SearchRecipesQueryProps> = props => (
  <Query<SearchRecipes.Query, SearchRecipes.Variables>
    query={Document}
    {...props}
  />
);

export default SearchRecipesQuery;
