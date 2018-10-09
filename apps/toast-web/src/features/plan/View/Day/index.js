import React from 'react';
import gql from 'fraql';
import Meal from './Meal';

const fragments = {
  day: gql`
    fragment DayView on PlanDay {
      meals {
        ${Meal.fragments.meal}
      }
    }
  `,
};

const DayView = ({ day }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    {day.meals.map((meal, idx) => <Meal key={idx} meal={meal} />)}
  </div>
);

DayView.fragments = fragments;

export default DayView;
