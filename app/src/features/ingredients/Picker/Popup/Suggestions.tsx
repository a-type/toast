import React, { FC } from 'react';
import Suggestion from './Suggestion';
import Loader from 'components/generic/Loader';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Button, Typography, Box } from '@material-ui/core';

const IngredientPickerSuggestionsQuery = gql`
  query IngredientPickerSuggestions($input: FoodSearchInput!) {
    searchFoods(input: $input) {
      id
      name
    }
  }
`;

const hasNoResults = data =>
  !data || !data.searchFoods || data.searchFoods.length === 0;

export interface IngredientPickerSuggestionsProps {
  term: string;
  getItemProps(params: { item: any; index: number }): any;
  selectedItem?: number;
  highlightedIndex?: number;
  canCreate?: boolean;
}

export const Suggestions: FC<IngredientPickerSuggestionsProps> = ({
  term,
  getItemProps,
  highlightedIndex,
  canCreate,
}) => {
  const { data, loading, error } = useQuery(IngredientPickerSuggestionsQuery, {
    variables: {
      input: {
        term,
      },
    },
    skip: !term || term.length < 3,
  });
  const renderCreate = (term, getItemProps, index, highlightedIndex) => (
    <Button
      {...getItemProps({ item: { name: term }, index })}
      active={index === highlightedIndex}
    >{`Create new ingredient: "${term}"`}</Button>
  );

  if (loading) return <Loader size="64px" />;
  if (error) return <ErrorMessage error={error} />;
  if (hasNoResults(data)) {
    if (canCreate && term.length > 3) {
      return renderCreate(term, getItemProps, 0, highlightedIndex);
    } else {
      return <Typography>No results</Typography>;
    }
  }

  const items = data.searchFoods;

  return (
    <Box mt={1}>
      <Typography>Choose one:</Typography>
      <Box mb={2}>
        {items.map((ingredient, index) => (
          <Suggestion
            key={ingredient.id}
            {...getItemProps({ item: ingredient, index })}
            active={highlightedIndex === index}
          >
            {ingredient.name}
          </Suggestion>
        ))}
      </Box>
      {canCreate &&
        renderCreate(term, getItemProps, items.length, highlightedIndex)}
    </Box>
  );
};

export default Suggestions;
