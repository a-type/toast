import React, { FC } from 'react';
import RecipeSuggestions from './AssignRecipe';
import { PlanActionType } from './types';
import { PlanMealData } from '../types';
import { Box } from 'grommet';
import { Heading } from 'components/text';

export interface PlanMealDetailsStageProps {
  planDayId: string;
  mealName: string;
  actionType: PlanActionType;
  onCancel(): void;
  onDone(): void;
}

export const PlanMealDetailsStage: FC<PlanMealDetailsStageProps> = ({
  actionType,
  onCancel,
  onDone,
  planDayId,
  mealName,
}) => {
  if (actionType === PlanActionType.Cook) {
    return (
      <Box>
        <Heading level="3">Choose a Recipe</Heading>
        <RecipeSuggestions
          planDayId={planDayId}
          mealName={mealName}
          onRecipeSelected={onDone}
        />
      </Box>
    );
  }

  return null;
};

export default PlanMealDetailsStage;
