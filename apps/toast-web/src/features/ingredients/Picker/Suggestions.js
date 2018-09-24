// @flow

import React from 'react';
import { graphql, compose } from 'react-apollo';
import { type Ingredient, type SearchPayload } from 'types';
import Button from 'components/generic/Button';
import Suggestion from './Suggestion';
import Tip from './Tip';
import CreateButton from './CreateButton';
import { gql } from 'apollo-boost';

const SearchIngredients = gql`
  query SearchIngredients($input: IngredientSearchInput!) {
    searchIngredients(input: $input) {
      items {
        id
        name
      }
    }
  }
`;

export type QueryData = {
  searchIngredients: SearchPayload<Ingredient>,
  loading: boolean,
  error?: string,
};

type SuggestionsProps = {
  term: string,
  getItemProps({ item: any, index: number }): any,
  selectedItem: any,
  highlightedIndex: number,
  data: QueryData,
  onCreate(newValue: Ingredient): any,
  canCreate: boolean,
};

const hasNoResults = ({
  searchIngredients,
}: {
  searchIngredients: SearchPayload<Ingredient>,
}) => !searchIngredients.items || searchIngredients.items.length === 0;

class Suggestions extends React.PureComponent<SuggestionsProps, *> {
  renderCreate = (term, getItemProps, index, highlightedIndex) => (
    <Button
      {...getItemProps({ item: { name: term }, index })}
      active={index === highlightedIndex}
    >
      {term} (create)
    </Button>
  );

  render() {
    const {
      term,
      getItemProps,
      selectedItem,
      highlightedIndex,
      data,
      canCreate,
    } = this.props;
    if (data.loading) return null;
    if (data.error) return <div>Error</div>;
    if (canCreate && hasNoResults(data)) {
      return this.renderCreate(term, getItemProps, 0, highlightedIndex);
    }

    const items = data.searchIngredients.items;

    return (
      <div>
        <Tip>Choose one:</Tip>
        {items.map((ingredient, index) => (
          <Suggestion
            key={ingredient.id}
            {...getItemProps({ item: ingredient, index })}
            active={highlightedIndex === index}
          >
            {ingredient.name}
          </Suggestion>
        ))}
        {canCreate &&
          this.renderCreate(term, getItemProps, items.length, highlightedIndex)}
      </div>
    );
  }
}

export default graphql(SearchIngredients, {
  options: ({ term }) => ({ variables: { input: { term } } }),
})(Suggestions);
