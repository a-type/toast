import * as React from 'react';
import { Popup, Button } from 'components/generic';
import { Recipe } from 'generated/schema';
import RecipeSuggestions from './RecipeSuggestions';
import { Controls } from 'components/layouts';

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
      <React.Fragment>
        <RecipeSuggestions onRecipeSelected={onChange} />
        <Controls>
          <Button onClick={handleClose}>Cancel</Button>
        </Controls>
      </React.Fragment>
    )}
  </Popup>
);

export default RecipeSelector;
