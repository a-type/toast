import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import gql from 'graphql-tag';
import CalendarMeal from '../CalendarMeal';
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
  weekIndex: number;
  dayIndex: number;
}

export default class CalendarDayViewMeals extends React.Component<
  CalendarDayViewMealsProps,
  any
> {
  static fragments = {
    day: gql`
      fragment CalendarDayViewMeals on PlanMeal {
        ...CalendarMeal
      }

      ${CalendarMeal.fragments.meal}
    `,
  };

  render() {
    const { meals, weekIndex, dayIndex } = this.props;

    return (
      <Grid>
        {meals.map((meal, mealIndex) => (
          <CalendarMeal
            key={meal.id}
            weekIndex={weekIndex}
            dayIndex={dayIndex}
            mealIndex={mealIndex}
            meal={meal}
          />
        ))}
      </Grid>
    );
  }
}