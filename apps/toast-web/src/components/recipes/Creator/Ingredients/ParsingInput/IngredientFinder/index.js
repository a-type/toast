// @flow

import React from 'react';
import { withApollo, type ApolloClient } from 'react-apollo';
import gql from 'graphql-tag';
import { type Ingredient } from 'types';
import debounce from 'lodash.debounce';

const SearchIngredients = gql`
  query SearchIngredients($term: String!) {
    searchIngredients(input: { term: $term }) {
      total
      items {
        id
        name
      }
    }
  }
`;

type Props = {
  term: string,
  ingredient: Ingredient,
  client: ApolloClient,
  onChange(newIngredient: Ingredient): mixed,
};

class IngredientFinder extends React.PureComponent<Props> {
  componentDidUpdate(oldProps) {
    const { term } = this.props;
    if (term && term !== oldProps.term) {
      this.debouncedSearchAndChange();
    }
  }

  searchAndChange = async () => {
    const { client, term, onChange } = this.props;
    if (!term || term.length < 3) {
      return;
    }

    const result = await client.query({
      query: SearchIngredients,
      variables: { term },
    });
    if (result.data.searchIngredients.items.length) {
      onChange(result.data.searchIngredients.items[0]);
    }
  };
  debouncedSearchAndChange = debounce(this.searchAndChange, 500);

  render() {
    const { ingredient } = this.props;
    if (!ingredient) {
      return 'Ingredient';
    }
    return ingredient.name;
  }
}

export default withApollo(IngredientFinder);
