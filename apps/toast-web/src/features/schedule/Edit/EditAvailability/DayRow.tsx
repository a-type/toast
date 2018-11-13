import React from 'react';
import gql from 'graphql-tag';
import { pathOr } from 'ramda';
import { Mutation } from 'react-apollo';
import AvailabilityPicker from './AvailabilityPicker';

const mealFragments = {
  meal: gql`
    fragment DayRowMeal on ScheduleMeal {
      id
      availability
      dayIndex
      mealIndex
    }
  `,
};

const SetMealDetails = gql`
  mutation SetMealDetails(
    $dayIndex: Int!
    $mealIndex: Int!
    $details: ScheduleSetMealDetailsInput!
  ) {
    setScheduleMealDetails(
      dayIndex: $dayIndex
      mealIndex: $mealIndex
      details: $details
    ) {
      id
      meals {
        id
        ...DayRowMeal
      }
    }
  }

  ${mealFragments.meal}
`;

const Meal = ({ mealName, mealIndex, dayIndex, meal, ...rest }) => (
  <Mutation mutation={SetMealDetails}>
    {mutate => (
      <AvailabilityPicker
        value={meal.availability || 'SKIP'}
        onChange={value =>
          mutate({
            variables: {
              mealIndex,
              dayIndex,
              details: { availability: value },
            },
          })
        }
        {...rest}
      />
    )}
  </Mutation>
);

Meal.fragments = mealFragments;

const DayRow = ({ dayIndex, meals, getMealStyle }) => {
  return (
    <React.Fragment>
      {['breakfast', 'lunch', 'dinner'].map((mealName, mealIndex) => (
        <Meal
          key={mealName}
          mealName={mealName}
          mealIndex={mealIndex}
          dayIndex={dayIndex}
          style={getMealStyle(dayIndex, mealIndex)}
          meal={pathOr({}, [mealIndex], meals)}
        />
      ))}
    </React.Fragment>
  );
};

DayRow.fragments = {
  meals: Meal.fragments.meal,
};

export default DayRow;
