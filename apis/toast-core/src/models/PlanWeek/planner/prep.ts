import logger from 'logger';
import { Schedule } from 'models';
import PlanWeek from '../PlanWeek';
import {
  PlanActionCook,
  PlanActionType,
  PlanActionEat,
  PlanWeekMeal,
  PlanActionEatOut,
} from '../types';
import { id } from 'tools';
import { initializeWeek, MEALS_PER_DAY } from './utils';

const prepMealType = (availability, totalServings) => {
  if (totalServings > 8) {
    // doesn't matter, that many servings is BIG
    return 'BIG';
  }

  if (totalServings <= 6) {
    // another arbitrary boundary: total number of 'fancy'
    // servings you could ever expect to make, period.
    return availability === 'LONG' ? 'FANCY' : 'NORMAL';
  }

  return availability === 'LONG' ? 'NORMAL' : 'QUICK';
};

const alreadyPlanned = (meal: PlanWeekMeal): boolean =>
  meal.actions &&
  meal.actions.some(action =>
    ['EAT', 'EAT_OUT', 'READY_MADE', 'SKIP'].includes(action.type),
  );

export default (schedule: Schedule, weekIndex: number): PlanWeek => {
  const week = new PlanWeek(initializeWeek(schedule, weekIndex));

  // FIXME: move this logic somewhere else...
  // const totalNones = mealList.filter(meal => meal.availability === 'NONE')
  //   .length;
  // const totalPrepCandidates = mealList.filter(meal =>
  //   ['MEDIUM', 'LARGE'].includes(meal.availability),
  // ).length;
  // if (totalPrepCandidates === 0) {
  //   throw new Error(
  //     "Sorry, but you don't seem to have enough free time to prepare meals! You need at least one day with an hour or so",
  //   );
  // }

  // if (totalNones / totalPrepCandidates > ALLOWED_NONE_RATIO) {
  //   schedule.addWarning(
  //     `You don't seem to have a lot of time to prep meals! You'll need to prep ${totalNones} meals in only ${totalPrepCandidates} day${
  //       totalPrepCandidates > 1 ? 's' : ''
  //     }. You can make your schedule more realistic by switching some meals to eating out.`,
  //   );
  // }

  let prepMeals: PlanWeekMeal[] = [];
  let needPrepMeals: PlanWeekMeal[] = [];

  const flushPrepMeals = () => {
    // keep track of how many meals we still need to schedule
    let mealCountLeft = needPrepMeals.length;

    // iterate through 'prep-ready' meals we have collected so far
    prepMeals.forEach(prepMeal => {
      const prepScheduleMeal = schedule.getMeal(
        prepMeal.dayIndex,
        prepMeal.mealIndex,
      );
      // grab a portion of the needy meals and assign them to this prep. Minimum 1 meal.
      // if there's only 1 meal but many prep-ready meals, the latter prep-ready meals
      // just become regular meals.
      const countOfMealsToPrepFor = Math.ceil(mealCountLeft / prepMeals.length);
      mealCountLeft -= countOfMealsToPrepFor;

      // add a cook action to cover all needed meals, plus eat for this meal.
      const cookAction = {
        weekIndex: weekIndex,
        dayIndex: prepMeal.dayIndex,
        mealIndex: prepMeal.mealIndex,
        type: PlanActionType.Cook,
        servings: schedule.defaultServings * (1 + countOfMealsToPrepFor),
        mealType: prepMealType(
          prepScheduleMeal.availability,
          (1 + countOfMealsToPrepFor) * schedule.defaultServings,
        ),
      };
      const finalCookAction = week.addAction(
        prepMeal.dayIndex,
        prepMeal.mealIndex,
        cookAction,
      );

      const eatAction = {
        weekIndex: weekIndex,
        dayIndex: prepMeal.dayIndex,
        mealIndex: prepMeal.mealIndex,
        type: PlanActionType.Eat,
        cookActionId: finalCookAction.id,
        leftovers: false,
      };

      // add both actions to corresponding meal in week
      week.addAction(prepMeal.dayIndex, prepMeal.mealIndex, eatAction);

      // grab the prepped meals from the list and apply them
      for (let i = 0; i < countOfMealsToPrepFor; i++) {
        const leftoverMeal = needPrepMeals.shift();
        const leftoverAction = {
          weekIndex: weekIndex,
          dayIndex: leftoverMeal.dayIndex,
          mealIndex: leftoverMeal.mealIndex,
          type: PlanActionType.Eat,
          cookActionId: finalCookAction.id,
          leftovers: true,
        };
        week.addAction(
          leftoverMeal.dayIndex,
          leftoverMeal.mealIndex,
          leftoverAction,
        );
      }
    });

    // reset both queues
    needPrepMeals = [];
    prepMeals = [];
  };

  for (let pointer = 0; pointer < week.meals.length; pointer++) {
    const currentMeal = week.meals[pointer];
    const dayIndex = currentMeal.dayIndex;
    const mealIndex = currentMeal.mealIndex;

    if (mealIndex === 0) {
      // TODO: breakfast
      continue;
    }

    const ScheduleMeal = schedule.getMeal(dayIndex, mealIndex);

    // L / M meals count as 'prep-ready'; i.e. we can increase their portions by decreasing
    // the complexity of the recipe so we can distribute portions to later "N" meals
    if (['LONG', 'MEDIUM'].includes(ScheduleMeal.availability)) {
      // if we already are tracking some prep candidates AND we already have meals which
      // need prepping, trigger the 'flush' behavior that goes ahead and correlates
      // prep meals to prepped meals
      if (prepMeals.length > 0 && needPrepMeals.length > 0) {
        flushPrepMeals();
      }

      if (!alreadyPlanned(currentMeal)) {
        prepMeals.push(currentMeal);
      }
    } else if (
      ScheduleMeal.availability === 'NONE' &&
      !alreadyPlanned(currentMeal)
    ) {
      // note: if we don't have any prep meals ready, we can catch this on the next round
      if (prepMeals.length > 0) {
        needPrepMeals.push(currentMeal);
      }
    } else if (
      ScheduleMeal.availability === 'SHORT' &&
      !alreadyPlanned(currentMeal)
    ) {
      // short stuff just gets assigned like normal, no sense prepping on these meals
      const cookActionData = {
        weekIndex,
        dayIndex,
        mealIndex,
        type: PlanActionType.Cook,
        mealType: 'QUICK',
        servings: schedule.defaultServings,
      };
      const cookAction = week.addAction(dayIndex, mealIndex, cookActionData);
      const eatAction = {
        weekIndex,
        dayIndex,
        mealIndex,
        type: PlanActionType.Eat,
        cookActionId: cookAction.id,
        leftovers: false,
      };
      week.addAction(dayIndex, mealIndex, eatAction);
    } else if (!alreadyPlanned(currentMeal)) {
      // eat out is transparently copied over
      const eatOutAction = {
        weekIndex,
        dayIndex,
        mealIndex,
        type: PlanActionType.EatOut,
      };
      week.addAction(dayIndex, mealIndex, eatOutAction);
    }
  }

  // add cooking to any trailing 'prep-ready' meals.
  flushPrepMeals();

  return week;
};
