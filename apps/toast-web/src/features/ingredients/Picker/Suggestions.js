import React from 'react';
import { graphql, compose } from 'react-apollo';
import Button from 'components/generic/Button/Button';
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

const hasNoResults = ({ searchIngredients }) =>
  !searchIngredients.items || searchIngredients.items.length === 0;

class Suggestions extends React.PureComponent {
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
