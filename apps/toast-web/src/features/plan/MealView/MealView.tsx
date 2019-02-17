import * as React from 'react';
import gql from 'graphql-tag';
import {
  PlanMeal,
  MealAction,
  MealActionType,
  MealActionCook,
  MealActionEat,
  MealActionEatOut,
  MealActionReadyMade,
} from 'generated/schema';
import {
  CookAction,
  EatAction,
  SkipAction,
  EatOutAction,
  ReadyMadeAction,
} from 'features/plan/actions';
import actionsFragment from 'features/plan/actions/fragment';
import { Label } from 'components/text';
import { MealStack } from './components';
import getPrimaryAction from 'features/plan/getPrimaryAction';
import { Card } from 'components/generic';
import { TextSkeleton } from 'components/skeletons';

const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

interface CalendarMealProps {
  meal: PlanMeal;
}

interface CalendarMealState {
  showRecipeSelector: boolean;
}

export const Skeleton = () => (
  <MealStack>
    <Label>
      <TextSkeleton />
    </Label>
    <Card.Skeleton />
  </MealStack>
);

export default class CalendarMeal extends React.Component<
  CalendarMealProps,
  CalendarMealState
> {
  static fragments = {
    meal: gql`
      fragment CalendarMeal on PlanMeal {
        id
        date
        dayIndex
        dateIndex
        mealIndex
        actions {
          id
          type
          ...CalendarMealAction
        }
      }
      ${actionsFragment}
    `,
  };

  state = {
    showRecipeSelector: false,
  };

  renderAction() {
    const { meal } = this.props;
    const action = getPrimaryAction([meal]);

    if (!action) {
      return <SkipAction />;
    }

    switch (action.type) {
      case MealActionType.COOK:
        return (
          <CookAction
            dateIndex={meal.dateIndex}
            mealIndex={meal.mealIndex}
            action={action as MealActionCook}
          />
        );
      case MealActionType.EAT:
        return <EatAction action={action as MealActionEat} />;
      case MealActionType.EAT_OUT:
        return <EatOutAction action={action as MealActionEatOut} />;
      case MealActionType.READY_MADE:
        return <ReadyMadeAction action={action as MealActionReadyMade} />;
      default:
        return <SkipAction />;
    }
  }

  render() {
    const { meal } = this.props;

    return (
      <MealStack>
        <Label>{MEALS[meal.mealIndex]}</Label>
        {this.renderAction()}
      </MealStack>
    );
  }
}
