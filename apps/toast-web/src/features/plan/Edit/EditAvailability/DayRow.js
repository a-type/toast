import React from 'react';
import gql from 'fraql';
import { pathOr } from 'ramda';
import { Mutation } from 'react-apollo';

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
      <div>
        <b>{mealName}</b>
        <br />
        <select
          value={meal.availability}
          onChange={ev =>
            mutate({
              variables: { details: { availability: ev.target.value } },
            })
          }
        >
          <option>NONE</option>
          <option>EAT_OUT</option>
          <option>SHORT</option>
          <option>MEDIUM</option>
          <option>LONG</option>
        </select>
      </div>
    )}
  </Mutation>
);

Meal.fragments = mealFragments;

const DayRow = ({ dayIndex, day }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    {['breakfast', 'lunch', 'dinner'].map((mealName, mealIndex) => (
      <Meal
        mealName={mealName}
        mealIndex={mealIndex}
        dayIndex={dayIndex}
        meal={pathOr({}, ['meals', mealIndex], day)}
      />
    ))}
  </div>
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
