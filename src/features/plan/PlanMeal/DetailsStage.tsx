import React, { FC } from 'react';
import RecipeSuggestions from './AssignRecipe';
import { PlanActionType } from './types';
import { PlanMealData } from '../types';
import { Box, Heading } from 'grommet';

export interface PlanMealDetailsStageProps {
  meal: PlanMealData;
  actionType: PlanActionType;
  onCancel(): void;
  onDone(): void;
}

export const PlanMealDetailsStage: FC<PlanMealDetailsStageProps> = ({
  actionType,
  onCancel,
  onDone,
  meal,
}) => {
  if (actionType === PlanActionType.Cook) {
    return (
      <Box>
        <Heading level="3">Choose a Recipe</Heading>
        <RecipeSuggestions planMealId={meal.id} onRecipeSelected={onDone} />
      </Box>
    );
  }

  return null;
};

export default PlanMealDetailsStage;
