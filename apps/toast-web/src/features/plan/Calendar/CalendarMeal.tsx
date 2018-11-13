import * as React from 'react';
import gql from 'graphql-tag';
import {
  PlanWeekMeal,
  PlanAction,
  PlanActionType,
  PlanActionCook,
  PlanActionEat,
  PlanActionEatOut,
  PlanActionReadyMade,
} from 'generated/schema';
import {
  CookAction,
  EatAction,
  SkipAction,
  EatOutAction,
  ReadyMadeAction,
} from 'features/plan/actions';
import { pick } from 'ramda';
import actionsFragment from 'features/plan/actions/fragment';
import { Label } from 'components/typeset';
import { MealStack } from './components';
import getPrimaryAction from 'features/plan/getPrimaryAction';

const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

interface CalendarMealProps {
  meal: PlanWeekMeal;
  weekIndex: number;
  dayIndex: number;
  mealIndex: number;
}

interface CalendarMealState {
  showRecipeSelector: boolean;
}

export default class CalendarMeal extends React.Component<
  CalendarMealProps,
  CalendarMealState
> {
  static fragments = {
    meal: gql`
      fragment CalendarMeal on PlanWeekMeal {
        id
        actions {
          id
          type
          ...CalendarPlanAction
        }
      }
      ${actionsFragment}
    `,
  };

  state = {
    showRecipeSelector: false,
  };

  renderAction() {
    const passOnProps = pick(
      ['weekIndex', 'dayIndex', 'mealIndex'],
      this.props,
    );
    const action = getPrimaryAction(this.props.meal);

    if (!action) {
      return <SkipAction />;
    }

    switch (action.type) {
      case PlanActionType.COOK:
        return (
          <CookAction {...passOnProps} action={action as PlanActionCook} />
        );
      case PlanActionType.EAT:
        return <EatAction {...passOnProps} action={action as PlanActionEat} />;
      case PlanActionType.EAT_OUT:
        return (
          <EatOutAction {...passOnProps} action={action as PlanActionEatOut} />
        );
      case PlanActionType.READY_MADE:
        return (
          <ReadyMadeAction
            {...passOnProps}
            action={action as PlanActionReadyMade}
          />
        );
      default:
        return <SkipAction />;
    }
  }

  render() {
    const { mealIndex } = this.props;

    return (
      <MealStack>
        <Label>{MEALS[mealIndex]}</Label>
        {this.renderAction()}
      </MealStack>
    );
  }
}
