import React from 'react';
import styled from 'styled-components';
import MealView from './MealView';
import gql from 'fraql';
import { H1 } from 'components/typeset';
import { format, isToday } from 'date-fns';

const Grid = styled.div`
  display: grid;
  grid-template-areas: 'mainMeal mainMeal' 'secondaryMeal tertiaryMeal';
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr 1fr;
  height: 50vh;
  gap: var(--spacing-lg);
`;

const formatDate = dateStr => {
  const date = new Date(dateStr);
  if (isToday(date)) {
    return 'Today';
  }
  return format(date, 'dddd, MMM Do');
};

const DayView = ({ day }) => (
  <div>
    <H1>{formatDate(day.date)}</H1>
    <Grid>
      <MealView
        style={{ gridArea: 'mainMeal' }}
        meal={day.meals[2]}
        title="Dinner"
        main
      />
      <MealView
        style={{ gridArea: 'secondaryMeal' }}
        meal={day.meals[1]}
        title="Lunch"
      />
      <MealView
        style={{ gridArea: 'tertiaryMeal' }}
        meal={day.meals[0]}
        title="Breakfast"
      />
    </Grid>
  </div>
);

DayView.fragments = {
  day: gql`
    fragment DayView on PlanDay {
      id
      date
      meals {
        ${MealView.fragments.meal}
      }
    }
  `,
};

export default DayView;
