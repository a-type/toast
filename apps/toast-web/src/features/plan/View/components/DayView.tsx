import React from 'react';
import styled from 'styled-components';
import MealView from './MealView';
import gql from 'graphql-tag';
import { H1 } from 'components/typeset';
import { formatDay } from 'formatters/date';

const Grid = styled.div`
  display: grid;
  grid-template-areas: 'mainMeal mainMeal' 'secondaryMeal tertiaryMeal';
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr 1fr;
  height: 50vh;
  gap: var(--spacing-lg);
`;

const DayView = ({ day }) =>
  day && (
    <div>
      <H1>{formatDay(day.date)}</H1>
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

DayView.Skeleton = props => (
  <div {...props}>
    <H1.Skeleton />
    <Grid>
      <MealView.Skeleton style={{ gridArea: 'mainMeal' }} />
      <MealView.Skeleton style={{ gridArea: 'secondaryMeal' }} />
      <MealView.Skeleton style={{ gridArea: 'tertiaryMeal' }} />
    </Grid>
  </div>
);

DayView.fragments = {
  day: gql`
    fragment DayView on PlanDay {
      id
      date
      meals {
        ...MealView
      }
    }

    ${MealView.fragments.meal}
  `,
};

export default DayView;
