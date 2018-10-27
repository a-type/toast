import React from 'react';
import gql from 'graphql-tag';
import { Card } from 'components/generic';
import { PlanMeal } from 'generated/schema';
import { CardSkeletonProps } from 'components/generic/Card/Skeleton';

const getCookAction = actions => actions.find(action => action.type === 'COOK');
const getEatAction = actions => actions.find(action => action.type === 'EAT');

const ActionDetails = ({ action }) => {
  if (!action) {
    return null;
  }

  return <span>{action.type}</span>;
};

interface MealViewProps {
  meal: PlanMeal;
  title: string;
  main?: boolean;
  style?: React.CSSProperties;
}

interface MealViewWithSkeleton extends React.SFC<MealViewProps> {
  Skeleton?: React.SFC<CardSkeletonProps>;
  fragments: {
    [name: string]: any;
  };
}

const MealView: MealViewWithSkeleton = ({ meal, title, main, ...rest }) => {
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
