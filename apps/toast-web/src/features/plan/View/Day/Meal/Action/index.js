import React from 'react';
import gql from 'fraql';

const fragments = {
  action: gql`
    fragment ActionView on PlanAction {
      type

      ... on PlanActionEatOut {
        note
      }

      ... on PlanActionCook {
        servings
        mealType
      }

      ... on PlanActionEat {
        mealDay
        mealIndex
        leftovers
      }

      ... on PlanActionReadyMade {
        note
      }
    }
  `,
};

const ActionView = ({ action }) => (
  <div>
    {action.type}
    <div>{JSON.stringify(action, null, ' ')}</div>
  </div>
);

ActionView.fragments = fragments;

export default ActionView;
