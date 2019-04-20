import React, { FC } from 'react';
import { Button, Box } from 'grommet';
import Suggestion from './Suggestion';
import { HelpText } from 'components/text';
import { Loader } from 'components/generic';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from 'components/generic/ErrorMessage';

const IngredientPickerSuggestionsQuery = gql`
  query IngredientPickerSuggestions($input: IngredientSearchInput!) {
    searchIngredients(input: $input) {
      id
      name
    }
  }
`;

const hasNoResults = ({ searchIngredients }) =>
  !searchIngredients || searchIngredients.length === 0;

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
  });
  const renderCreate = (term, getItemProps, index, highlightedIndex) => (
    <Button
      {...getItemProps({ item: { name: term }, index })}
      active={index === highlightedIndex}
      label={`Create new ingredient: "${term}"`}
    />
  );

  if (loading) return <Loader size="64px" />;
  if (error) return <ErrorMessage error={error} />;
  if (hasNoResults(data)) {
    if (canCreate && term.length > 3) {
      return renderCreate(term, getItemProps, 0, highlightedIndex);
    } else {
      return <HelpText>No results</HelpText>;
    }
  }

  const items = data.searchIngredients;

  return (
    <Box pad="small" margin={{ top: 'small' }}>
      <HelpText>Choose one:</HelpText>
      <Box margin={{ bottom: 'medium' }}>
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
