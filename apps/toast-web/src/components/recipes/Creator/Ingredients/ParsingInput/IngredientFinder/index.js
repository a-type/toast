// @flow

import React from 'react';
import { withApollo, type ApolloClient } from 'react-apollo';
import gql from 'graphql-tag';
import { type Ingredient } from 'types';
import debounce from 'lodash.debounce';
import { sentence } from 'change-case';

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

type State = {
  loading: boolean,
};

class IngredientFinder extends React.PureComponent<Props, State> {
  state = {
    loading: false,
  };

  componentDidUpdate(oldProps) {
    const { term, ingredient } = this.props;
    if (term && term !== oldProps.term && !(!oldProps.term && ingredient)) {
      this.debouncedSearchAndChange();
    }
  }

  searchAndChange = async () => {
    const { client, term, onChange } = this.props;
    if (!term || term.length < 3) {
      return;
    }

    this.setState({ loading: true });

    const result = await client.query({
      query: SearchIngredients,
      variables: { term },
    });

    if (result.data.searchIngredients.items.length) {
      onChange(result.data.searchIngredients.items[0]);
    }

    this.setState({ loading: false });
  };
  debouncedSearchAndChange = debounce(this.searchAndChange, 500);

  render() {
    const { ingredient } = this.props;
    const { loading } = this.state;

    if (loading) {
      return 'Searching...';
    }

    if (!ingredient) {
      return 'Ingredient';
    }

    return sentence(ingredient.name);
  }
}

export default withApollo(IngredientFinder);
