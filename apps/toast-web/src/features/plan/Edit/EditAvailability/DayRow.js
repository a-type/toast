import React from 'react';
import gql from 'fraql';
import { pathOr } from 'ramda';
import { Mutation } from 'react-apollo';
import AvailabilityPicker from './AvailabilityPicker';

const mealFragments = {
  meal: gql`
    fragment Meal on PlanMeal {
      availability
    }
  `,
};

const SetMealDetails = gql`
  mutation SetMealDetails($dayIndex: Int!, $mealIndex: Int!, $details: PlanSetMealDetailsInput!) {
    setPlanMealDetails(dayIndex: $dayIndex, mealIndex: $mealIndex, details: $details) {
      id
      days {
        meals {
          ${mealFragments.meal}
        }
      }
    }
  }
`;

const Meal = ({ mealName, mealIndex, dayIndex, meal }) => (
  <Mutation mutation={SetMealDetails} variables={{ mealIndex, dayIndex }}>
    {mutate => (
      <AvailabilityPicker
        value={meal.availability || 'SKIP'}
        onChange={availability =>
          mutate({
            variables: { details: { availability } },
          })
        }
      />
    )}
  </Mutation>
);

Meal.fragments = mealFragments;

const DayRow = ({ dayIndex, day }) => (
  <React.Fragment>
    {['breakfast', 'lunch', 'dinner'].map((mealName, mealIndex) => (
      <Meal
        mealName={mealName}
        mealIndex={mealIndex}
        dayIndex={dayIndex}
        meal={pathOr({}, ['meals', mealIndex], day)}
      />
    ))}
  </React.Fragment>
);

DayRow.fragments = {
  day: gql`
    fragment DayRow on PlanDay {
      meals {
        ${Meal.fragments.meal}
      }
    }
  `,
};

export default DayRow;
