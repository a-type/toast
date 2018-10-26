import * as React from 'react';
import { Popup, Button } from 'components/generic';
import { Recipe } from 'generated/schema';

interface RecipeSelectorProps {
  onCancel(): void;
  onChange(recipe: Recipe): void;
}

const RecipeSelector: React.SFC<RecipeSelectorProps> = ({ onCancel }) => (
  <Popup onClose={onCancel}>
    {({ handleClose }) => (
      <div>
        <Button onClick={handleClose}>Close</Button>
      </div>
    )}
  </Popup>
);

export default RecipeSelector;
