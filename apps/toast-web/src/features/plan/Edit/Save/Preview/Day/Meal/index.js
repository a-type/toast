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

const choosePrimaryAction = actions => {
  const cookAction = actions.find(action => action.type === 'COOK');
  if (cookAction) {
    return cookAction;
  }

  const leftoversAction = actions.find(
    action => action.type === 'EAT' && action.leftovers,
  );
  if (leftoversAction) {
    return leftoversAction;
  }

  const eatOutAction = actions.find(action =>
    ['EAT_OUT', 'PREMADE'].includes(action.type),
  );
  if (eatOutAction) {
    return eatOutAction;
  }

  return actions[0];
};

const MealView = ({ meal, ...rest }) => {
  const primaryAction = choosePrimaryAction(meal.actions);

  if (primaryAction) {
    return <Action action={primaryAction} {...rest} />;
  }

  return <div {...rest}>Blank</div>;
};

MealView.fragments = fragments;

export default MealView;
