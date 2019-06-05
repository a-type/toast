import React, { SFC } from 'react';
import { PlanMealData } from '../types';
import { Box } from 'grommet';
import { Label } from 'components/text';
import { TextSkeleton, CardSkeleton } from 'components/skeletons';
import styled from 'styled-components';
import EmptyMeal from './EmptyMeal';
import PlannedMeal from './PlannedMeal';

const MealBox = styled(Box)`
  & > *:last-child {
    flex: 1;
  }
`;

interface MealProps {
  planDayId: string;
  meal: PlanMealData;
  mealName: string;
}

const Meal: SFC<MealProps> = ({ meal, mealName, planDayId }) => {
  const empty = !meal;

  return (
    <MealBox>
      <Label>{mealName}</Label>
      {empty ? (
        <EmptyMeal planDayId={planDayId} mealName={mealName} />
      ) : (
        <PlannedMeal meal={meal} />
      )}
    </MealBox>
  );
};

export const MealSkeleton = () => (
  <MealBox>
    <Label>
      <TextSkeleton />
    </Label>
    <CardSkeleton />
  </MealBox>
);

export default Meal;
