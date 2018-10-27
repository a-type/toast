import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { RecipeSearchFilters } from 'generated/schema';

export const Document = gql`
  query RecipeSearchFilters {
    searchFilters @client {
      id
      type
      subject
    }
  }
`;

interface RecipeSearchFiltersQueryProps {
  variables?: RecipeSearchFilters.Variables;
  children(
    result: QueryResult<
      RecipeSearchFilters.Query,
      RecipeSearchFilters.Variables
    >,
  ): React.ReactNode;
}

const RecipeSearchFiltersQuery: React.SFC<
  RecipeSearchFiltersQueryProps
> = props => (
  <Query<RecipeSearchFilters.Query, RecipeSearchFilters.Variables>
    query={Document}
    {...props}
  />
);

export default RecipeSearchFiltersQuery;
