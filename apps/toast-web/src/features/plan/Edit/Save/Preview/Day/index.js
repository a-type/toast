import React from 'react';
import gql from 'fraql';
import Meal from './Meal';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const fragments = {
  day: gql`
    fragment DayView on PlanDay {
      meals {
        ${Meal.fragments.meal}
      }
    }
  `,
};

const DayView = ({ day, dayIndex, getMealStyle }) => (
  <React.Fragment>
    {day.meals.map((meal, idx) => (
      <Meal key={idx} meal={meal} style={getMealStyle(dayIndex, idx)} />
    ))}
  </React.Fragment>
);

DayView.fragments = fragments;

export default DayView;
