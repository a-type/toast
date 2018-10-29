import * as React from 'react';
import gql from 'graphql-tag';
import {
  PlanMeal,
  PlanAction,
  PlanActionType,
  PlanActionCook,
  PlanActionEat,
} from 'generated/schema';
import { CookAction, EatAction, SkipAction } from 'features/plan/actions';
import { pick } from 'ramda';
import actionsFragment from 'features/plan/actions/fragment';
import { Label } from 'components/typeset';
import { MealStack } from './components';

const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

interface CalendarMealProps {
  meal: PlanMeal;
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
      fragment CalendarMeal on PlanMeal {
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

  getPrimaryAction = (): PlanAction | null => {
    const {
      meal: { actions },
    } = this.props;

    const proiritizedActionTypes: PlanActionType[] = [
      PlanActionType.COOK,
      PlanActionType.EAT,
      PlanActionType.EAT_OUT,
      PlanActionType.READY_MADE,
      PlanActionType.SKIP,
    ];

    for (let i in proiritizedActionTypes) {
      const t = proiritizedActionTypes[i];
      const action = actions.find(action => action.type === t);
      if (action) {
        return action;
      }
    }

    return null;
  };

  renderAction() {
    const passOnProps = pick(
      ['weekIndex', 'dayIndex', 'mealIndex'],
      this.props,
    );
    const action = this.getPrimaryAction();

    switch (action.type) {
      case PlanActionType.COOK:
        return (
          <CookAction {...passOnProps} action={action as PlanActionCook} />
        );
      case PlanActionType.EAT:
        return <EatAction {...passOnProps} action={action as PlanActionEat} />;
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
