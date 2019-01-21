import React from 'react';
import Button from 'components/generic/Button/Button';
import Suggestion from './Suggestion';
import IngredientPickerSuggestionsQuery from './IngredientPickerSuggestionsQuery';
import { IngredientPickerSuggestions } from 'generated/schema';
import { HelpText } from 'components/typeset';
import { Loader } from 'components/generic';

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
          if (loading) return <Loader size={64} />;
          if (error) return <div>Error</div>;
          if (canCreate && hasNoResults(data)) {
            return this.renderCreate(term, getItemProps, 0, highlightedIndex);
          }

          const items = data.searchIngredients.items;

          return (
            <div>
              <HelpText>Choose one:</HelpText>
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
