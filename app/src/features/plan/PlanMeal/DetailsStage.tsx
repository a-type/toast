import React, { FC } from 'react';
import RecipeSuggestions from './AssignRecipe';
import { PlanActionType } from './types';
import { Typography, Box } from '@material-ui/core';

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
      <RecipeSuggestions
        planDayId={planDayId}
        mealName={mealName}
        onRecipeSelected={onDone}
      />
    );
  }

  return null;
};

export default PlanMealDetailsStage;
