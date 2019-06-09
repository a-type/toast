import React, { FC } from 'react';
import { PlanMealRecipeData } from '../types';
import useAssignMeal from '../useAssignMeal';
import useNumberInput from 'hooks/useNumberInput';
import RecipePicker from 'features/collections/RecipePicker';
import { Box, TextField } from '@material-ui/core';

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
      <Box mb={2}>
        <TextField {...servingsInputProps} label="Servings" required />
      </Box>
      <RecipePicker onRecipeSelected={onSelected} />
    </>
  );
};

export default AssignRecipe;
