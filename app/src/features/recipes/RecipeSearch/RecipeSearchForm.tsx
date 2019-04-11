import React, { FC } from 'react';
import { RecipeSearchIngredientFilterValue } from 'contexts/RecipeSearchContext';
import { Box, TextInput, Heading, Button } from 'grommet';
import { Field } from 'components/generic';
import { Picker } from 'features/ingredients';

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
    <Box margin={{ bottom: 'medium' }}>
      <Field label="Search for recipes" required>
        <TextInput
          value={searchTerm}
          onChange={ev => onSearchTermChanged(ev.target.value)}
        />
      </Field>
      {/* <Box>
        <Heading level="5" margin={{ top: 'medium', bottom: 'small' }}>
          Include:
        </Heading>
        {includeIngredients.map(ing => (
          <Button
            color="accent-4"
            label={ing.name}
            onClick={() => removeIncludeIngredient(ing.id)}
          />
        ))}
        <Picker
          onChange={addIncludeIngredient}
          value={{ id: 'empty', name: 'Choose ingredient' }}
        />
      </Box>
      <Box>
        <Heading level="5" margin={{ top: 'medium', bottom: 'small' }}>
          Exclude:
        </Heading>
        {excludeIngredients.map(ing => (
          <Button
            color="accent-2"
            label={ing.name}
            onClick={() => removeExcludeIngredient(ing.id)}
          />
        ))}
        <Picker
          onChange={addExcludeIngredient}
          value={{ id: 'empty', name: 'Choose ingredient' }}
        />
      </Box> */}
    </Box>
  );
};
