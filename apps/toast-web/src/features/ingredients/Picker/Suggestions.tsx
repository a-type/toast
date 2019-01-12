import React from 'react';
import Button from 'components/generic/Button/Button';
import Suggestion from './Suggestion';
import Tip from './Tip';
import CreateButton from './CreateButton';
import IngredientPickerSuggestionsQuery from './IngredientPickerSuggestionsQuery';
import { IngredientPickerSuggestions, Ingredient } from 'generated/schema';

const hasNoResults = ({ searchIngredients }) =>
  !searchIngredients.items || searchIngredients.items.length === 0;

export interface IngredientPickerSuggestionsProps {
  term: string;
  getItemProps(params: {
    item: IngredientPickerSuggestions.Items;
    index: number;
  }): any;
  selectedItem?: number;
  highlightedIndex?: number;
  canCreate?: boolean;
  onCreate?(newValue: Ingredient): void;
}

class Suggestions extends React.PureComponent<
  IngredientPickerSuggestionsProps
> {
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
      canCreate,
    } = this.props;

    return (
      <IngredientPickerSuggestionsQuery
        variables={{
          input: {
            term,
          },
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return <div>Error</div>;
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
                this.renderCreate(
                  term,
                  getItemProps,
                  items.length,
                  highlightedIndex,
                )}
            </div>
          );
        }}
      </IngredientPickerSuggestionsQuery>
    );
  }
}

export default Suggestions;
