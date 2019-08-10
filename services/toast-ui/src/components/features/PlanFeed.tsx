import React, { FC } from 'react';
import { PlanMealPlanMeal, PlanMeal } from './PlanMeal';
import { Box } from '@material-ui/core';

export type PlanFeedProps = {
  mealEdges: PlanFeedMealEdge[];
};

export type PlanFeedMealEdge = {
  cursor: string;
  node: PlanMealPlanMeal;
};

export const PlanFeed: FC<PlanFeedProps> = ({ mealEdges }) => {
  if (mealEdges.length === 0) {
    return <div>No meals planned</div>;
  }

  return (
    <Box>
      {mealEdges.map(edge => (
        <PlanMeal key={edge.cursor} meal={edge.node} />
      ))}
    </Box>
  );
};
