import React, { FC } from 'react';
import { PlanMealRecipeData } from '../types';
import { Box, TextInput } from 'grommet';
import { Field } from 'components/generic';
import useAssignMeal from '../useAssignMeal';
import useNumberInput from 'hooks/useNumberInput';
import RecipePicker from 'features/collections/RecipePicker';

interface AssignRecipeProps {
  onRecipeSelected(): void;
  planDayId: string;
  mealName: string;
}

const AssignRecipe: FC<AssignRecipeProps> = ({
  onRecipeSelected,
  planDayId,
  mealName,
}) => {
  const assign = useAssignMeal();
  const [servings, servingsInputProps] = useNumberInput(2);

  const onSelected = async (recipe: PlanMealRecipeData) => {
    await assign({ planDayId, recipeId: recipe.id, servings, mealName });
    onRecipeSelected();
  };

  return (
    <>
      <Box margin={{ bottom: 'medium' }}>
        <Field label="Servings" required>
          <TextInput {...servingsInputProps} />
        </Field>
      </Box>
      <RecipePicker onRecipeSelected={onSelected} />
    </>
  );
};

export default AssignRecipe;
