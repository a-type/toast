import * as React from 'react';
import { Popup, Button } from 'components/generic';
import { Recipe } from 'generated/schema';
import RecipeSuggestions from './RecipeSuggestions';

interface RecipeSelectorProps {
  onCancel(): void;
  onChange(recipe: Recipe): void;
}

const RecipeSelector: React.SFC<RecipeSelectorProps> = ({
  onCancel,
  onChange,
}) => (
  <Popup onClose={onCancel}>
    {({ handleClose }) => (
      <RecipeSuggestions
        onRecipeSelected={recipe => {
          onChange(recipe);
          handleClose();
        }}
      />
    )}
  </Popup>
);

export default RecipeSelector;
