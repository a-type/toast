import React from 'react';
import gql from 'fraql';
import Action from './Action';

const fragments = {
  meal: gql`
    fragment MealView on PlanMeal {
      actions {
        ${Action.fragments.action}
      }
    }
  `,
};

const MealView = ({ meal }) => (
  <div>
    {meal.actions.map((action, idx) => (
      <Action key={`${idx}-${action.type}`} action={action} />
    ))}
  </div>
);

MealView.fragments = fragments;

export default MealView;
