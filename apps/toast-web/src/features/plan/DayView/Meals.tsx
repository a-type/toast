import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import gql from 'graphql-tag';
import CalendarMeal from '../MealView';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-areas: 'dinner dinner' 'lunch breakfast';
  height: 50vh;
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

export default class CalendarDayViewMeals extends React.Component<
  CalendarDayViewMealsProps,
  any
> {
  static fragments = {
    day: gql`
      fragment CalendarDayViewMeals on ScheduleMeal {
        ...CalendarMeal
      }

      ${CalendarMeal.fragments.meal}
    `,
  };

  render() {
    const { meals } = this.props;

    return (
      <Grid>
        {meals.map(meal => (
          <CalendarMeal key={meal.id} meal={meal} />
        ))}
      </Grid>
    );
  }
}
