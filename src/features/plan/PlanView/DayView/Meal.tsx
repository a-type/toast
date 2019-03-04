import React, { SFC } from 'react';
import { PlanMeal } from '../types';
import { Box } from 'grommet';
import { Label } from 'components/text';
import { Card } from 'components/generic';
import { TextSkeleton, CardSkeleton } from 'components/skeletons';
import styled from 'styled-components';

const MealBox = styled(Box)`
  & > *:last-child {
    flex: 1;
  }
`;

interface MealProps {
  meal: PlanMeal;
  mealName: string;
}

const Meal: SFC<MealProps> = ({ meal, mealName }) => {
  return (
    <MealBox>
      <Label>{mealName}</Label>
      <Card>It's a meal! {meal.id}</Card>
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
