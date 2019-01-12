import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { IngredientPickerSuggestions } from 'generated/schema';

export const Document = gql`
  query IngredientPickerSuggestions($input: IngredientSearchInput!) {
    searchIngredients(input: $input) {
      items {
        id
        name
      }
    }
  }
`;

interface IngredientPickerSuggestionsQueryProps {
  variables?: IngredientPickerSuggestions.Variables;
  skip?: boolean;
  children(
    result: QueryResult<
      IngredientPickerSuggestions.Query,
      IngredientPickerSuggestions.Variables
    >,
  ): React.ReactNode;
}

const IngredientPickerSuggestionsQuery: React.SFC<
  IngredientPickerSuggestionsQueryProps
> = props => (
  <Query<
    IngredientPickerSuggestions.Query,
    IngredientPickerSuggestions.Variables
  >
    query={Document}
    {...props}
  />
);

export default IngredientPickerSuggestionsQuery;
