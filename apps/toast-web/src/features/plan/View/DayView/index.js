import React from 'react';
import styled from 'styled-components';
import MainMeal from './MainMeal';
import gql from 'fraql';

const Grid = styled.div`
  display: grid;
  grid-template-areas: 'mainMeal' 'secondaryMeal' 'tertiaryMeal';
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr 1fr;
  height: 80vh;
`;

const DayView = ({ day }) => (
  <Grid>
    <MainMeal style={{ gridArea: 'mainMeal' }} meal={day.meals[2]} />
  </Grid>
);

DayView.fragments = {
  day: gql`
    fragment DayView on PlanDay {
      meals {
        ${MainMeal.fragments.meal}
      }
    }
  `,
};

export default DayView;
