import * as React from 'react';
import gql from 'graphql-tag';
import {
  PlanPreviewMeal,
  MealActionType,
  MealActionCook,
} from 'generated/schema';
import { Box } from './components';
import getPrimaryAction from 'features/plan/getPrimaryAction';
import { Label, HelpText } from 'components/typeset';
import { formatActionType } from 'formatters';
import { MealActionGuards } from 'guards';

export interface PlanPreviewMealProps
  extends React.HTMLAttributes<HTMLDivElement> {
  meal: PlanPreviewMeal.Fragment;
}

const MEAL_NAMES = ['Breakfast', 'Lunch', 'Dinner'];
const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const Meal: React.SFC<PlanPreviewMealProps> & { fragments: { meal: any } } = ({
  meal,
  ...rest
}) => {
  const primaryAction = getPrimaryAction([meal]);

  if (!primaryAction) {
    return (
      <Box {...rest}>
        <Label>{MEAL_NAMES[meal.mealIndex]}</Label>
        <span>Skip</span>
      </Box>
    );
  }

  let extraContent = null;
  if (MealActionGuards.isCookAction(primaryAction)) {
    extraContent = <HelpText>{primaryAction.servings} servings</HelpText>;
  } else if (MealActionGuards.isEatAction(primaryAction)) {
    extraContent = primaryAction.leftovers ? (
      <HelpText>
        Leftovers from {DAY_NAMES[primaryAction.cookAction.dayIndex]}
      </HelpText>
    ) : null;
  }

  return (
    <Box {...rest}>
      <Label>{MEAL_NAMES[meal.mealIndex]}</Label>
      <span>{formatActionType(primaryAction.type)}</span>
      {extraContent}
    </Box>
  );
};

Meal.fragments = {
  meal: gql`
    fragment PlanPreviewMeal on PlanMeal {
      id
      dayIndex
      dateIndex
      mealIndex
      actions {
        id
        type
        ... on MealActionCook {
          servings
          recipeType
          recipe {
            id
            title
            coverImage {
              id
              url
            }
          }
        }
        ... on MealActionEat {
          leftovers
          cookAction {
            id
            dayIndex
          }
        }
      }
    }
  `,
};

export default Meal;
