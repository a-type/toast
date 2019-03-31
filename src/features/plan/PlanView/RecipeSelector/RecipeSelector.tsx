import React, { SFC, Suspense } from 'react';
import { Layer, Button, Box } from 'grommet';
import { PlanMealRecipeData } from '../../types';
import RecipeSuggestions from './RecipeSuggestions';
import { GlobalLoader } from 'components/generic/Loader';

interface RecipeSelectorProps {
  onCancel(): void;
  onChange(recipe: PlanMealRecipeData): void;
}

const RecipeSelector: SFC<RecipeSelectorProps> = ({ onCancel, onChange }) => {
  return (
    <Suspense fallback={GlobalLoader}>
      <Layer onClickOutside={onCancel}>
        <Box pad="large">
          <RecipeSuggestions
            onRecipeSelected={recipe => {
              onChange(recipe);
            }}
            onCancel={onCancel}
          />
          <Button onClick={() => onCancel()} label="Cancel" />
        </Box>
      </Layer>
    </Suspense>
  );
};

export default RecipeSelector;
