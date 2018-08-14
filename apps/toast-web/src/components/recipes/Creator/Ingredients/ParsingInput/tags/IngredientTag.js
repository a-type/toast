// @flow

import React from 'react';
import EditableTag from './EditableTag';
import Picker from 'components/ingredients/Picker';
import { type Ingredient } from 'types';
import { withApollo, type ApolloClient } from 'react-apollo';
import gql from 'graphql-tag';
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
  value: Ingredient,
  onChange(value: Ingredient): mixed,
  term: string,
  client: ApolloClient,
};

type State = {
  loading: boolean,
};

const IngredientEditor = ({ initialValue, save }) => (
  <Picker value={initialValue} onChange={save} canCreate />
);

export class IngredientTag extends React.PureComponent<Props, State> {
  state = {
    loading: false,
  };

  componentDidUpdate(oldProps: Props) {
    const { term, value } = this.props;
    if (term && term !== oldProps.term && !(!oldProps.term && value)) {
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
    const { value, onChange } = this.props;

    return (
      <EditableTag
        value={value}
        onChange={onChange}
        name="unit"
        color="brand"
        renderDisplayValue={value => (value ? sentence(value.name) : 'None')}
        renderEditor={(currentValue, save) => (
          <IngredientEditor initialValue={currentValue} save={save} />
        )}
      />
    );
  }
}

export default withApollo(IngredientTag);
