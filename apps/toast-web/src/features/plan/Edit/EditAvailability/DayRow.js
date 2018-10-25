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

const Meal = ({ mealName, mealIndex, dayIndex, meal, ...rest }) => (
  <Mutation mutation={SetMealDetails} variables={{ mealIndex, dayIndex }}>
    {mutate => (
      <AvailabilityPicker
        value={meal.availability || 'SKIP'}
        onChange={value =>
          mutate({
            variables: { details: { availability: value } },
          })
        }
        {...rest}
      />
    )}
  </Mutation>
);

Meal.fragments = mealFragments;

const DayRow = ({ dayIndex, day, getMealStyle }) => (
  <React.Fragment>
    {['breakfast', 'lunch', 'dinner'].map((mealName, mealIndex) => (
      <Meal
        mealName={mealName}
        mealIndex={mealIndex}
        dayIndex={dayIndex}
        style={getMealStyle(dayIndex, mealIndex)}
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