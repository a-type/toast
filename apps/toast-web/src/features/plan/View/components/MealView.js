import React from 'react';
import gql from 'fraql';
import { Card } from 'components/generic';

const getCookAction = actions => actions.find(action => action.type === 'COOK');
const getEatAction = actions => actions.find(action => action.type === 'EAT');

const ActionDetails = ({ action }) => {
  if (!action) {
    return null;
  }

  return <span>{action.type}</span>;
};

const MealView = ({ meal, title, main, ...rest }) => {
  if (!meal) {
    return null;
  }

  const cookAction = getCookAction(meal.actions);

  return (
    <Card {...rest}>
      <span>{title}</span>
      <ActionDetails action={cookAction} />
    </Card>
  );
};

MealView.Skeleton = props => <Card.Skeleton {...props} />;

MealView.fragments = {
  meal: gql`
    fragment MealView on PlanMeal {
      id
      actions {
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
          cookAction {
            servings
            mealType
          }
        }

        ... on PlanActionReadyMade {
          note
        }
      }
    }
  `,
};

export default MealView;
