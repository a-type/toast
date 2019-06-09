import React, { FC } from 'react';
import { RecipeSearchIngredientFilterValue } from 'contexts/RecipeSearchContext';
import { TextField, Box } from '@material-ui/core';

export interface RecipeSearchFormProps {
  searchTerm: string;
  onSearchTermChanged(term: string): void;
  includeIngredients: RecipeSearchIngredientFilterValue[];
  excludeIngredients: RecipeSearchIngredientFilterValue[];
  addIncludeIngredient(ingredient: RecipeSearchIngredientFilterValue): void;
  addExcludeIngredient(ingredient: RecipeSearchIngredientFilterValue): void;
  removeIncludeIngredient(id: string): void;
  removeExcludeIngredient(id: string): void;
}

export const RecipeSearchForm: FC<RecipeSearchFormProps> = ({
  searchTerm,
  onSearchTermChanged,
  includeIngredients,
  excludeIngredients,
  addIncludeIngredient,
  addExcludeIngredient,
  removeIncludeIngredient,
  removeExcludeIngredient,
}) => {
  return (
    <Box mb={2}>
      <TextField
        label="Search for recipes"
        value={searchTerm}
        onChange={ev => onSearchTermChanged(ev.target.value)}
        fullWidth
      />
    </Box>
  );
};
