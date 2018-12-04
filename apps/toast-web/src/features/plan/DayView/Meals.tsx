import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import gql from 'graphql-tag';
import CalendarMeal, { Skeleton as MealViewSkeleton } from '../MealView';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-areas: 'breakfast dinner' 'lunch dinner';
  height: 33vh;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  & > *:first-child {
    grid-area: breakfast;
  }

  & > *:nth-child(2) {
    grid-area: lunch;
  }

  & > *:nth-child(3) {
    grid-area: dinner;
  }
`;

interface CalendarDayViewMealsProps {
  meals: PlanMeal[];
}

export const fragments = {
  meals: gql`
    fragment CalendarDayViewMealsMeal on PlanMeal {
      ...CalendarMeal
    }

    ${CalendarMeal.fragments.meal}
  `,
};

export const Skeleton = () => (
  <Grid>{new Array(3).fill(null).map((_, idx) => <MealViewSkeleton />)}</Grid>
);

export default class CalendarDayViewMeals extends React.Component<
  CalendarDayViewMealsProps,
  any
> {
  render() {
    const { meals } = this.props;

    return (
      <Grid>
        {meals.map(meal => <CalendarMeal key={meal.id} meal={meal} />)}
      </Grid>
    );
  }
}
