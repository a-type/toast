// @flow

import React, { type Node } from 'react';
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
  onChangeSelection(): mixed,
  children: Node,
};

type State = {
  loading: boolean,
};

export default class IngredientTag extends React.PureComponent<Props, State> {
  state = {
    loading: false,
  };

  render() {
    const { value, onChangeSelection, children } = this.props;

    return (
      <EditableTag color="brand" onChangeSelection={onChangeSelection}>
        {children}
      </EditableTag>
    );
  }
}
