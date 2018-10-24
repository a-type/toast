import { toMealList } from './utils';
import { clone } from 'ramda';
import logger from '../../logger';

const ALLOWED_NONE_RATIO = 6;

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

const alreadyPlanned = meal =>
  meal.actions &&
  meal.actions.some(action =>
    ['EAT', 'EAT_OUT', 'READY_MADE', 'SKIP'].includes(action.type),
  );

const getPlannedMeals = mealList => mealList.filter(alreadyPlanned).length;

const countRemainingPrepCandidates = mealList =>
  mealList.filter(
    meal => meal.availability === 'NONE' && meal.actions.length === 0,
  ).length;

export default plan => {
  plan.reset();

  // skip breakfast for main planning
  const mealList = plan.listMeals([1, 2]);

  // TODO: make this servings based?
  const totalNones = mealList.filter(meal => meal.availability === 'NONE')
    .length;
  const totalPrepCandidates = mealList.filter(meal =>
    ['MEDIUM', 'LARGE'].includes(meal.availability),
  ).length;
  if (totalPrepCandidates === 0) {
    throw new Error(
      "Sorry, but you don't seem to have enough free time to prepare meals! You need at least one day with an hour or so",
    );
  }

  if (totalNones / totalPrepCandidates > ALLOWED_NONE_RATIO) {
    plan.addWarning(
      `You don't seem to have a lot of time to prep meals! You'll need to prep ${totalNones} meals in only ${totalPrepCandidates} day${
        totalPrepCandidates > 1 ? 's' : ''
      }. You can make your schedule more realistic by switching some meals to eating out.`,
    );
  }

  let pointer = 0;
  let prepMeals = [];
  let needPrepMeals = [];
  let totalIterations = 0;

  // first skip breakfasts... for now...
  for (let i = 0; i < 7; i++) {
    plan.addAction(i, 0, 'SKIP');
  }

  while (!plan.fullyPrepared && totalIterations++ < 28) {
    const currentMeal = mealList[pointer];
    const dayIndex = currentMeal.dayIndex;
    const mealIndex = currentMeal.mealIndex;

    // L / M meals count as 'prep-ready'; i.e. we can increase their portions by decreasing
    // the complexity of the recipe so we can distribute portions to later "N" meals
    if (['LONG', 'MEDIUM'].includes(currentMeal.availability)) {
      // if we already are tracking some prep candidates AND we already have meals which
      // need prepping, trigger the 'flush' behavior that goes ahead and correlates
      // prep meals to prepped meals
      if (
        (prepMeals.length > 0 && needPrepMeals.length > 0) ||
        // edge case: this is the last meal(s) left
        countRemainingPrepCandidates(mealList) === 0
      ) {
        // keep track of how many meals we still need to plan
        let mealCountLeft = needPrepMeals.length;

        // iterate through 'prep-ready' meals we have collected so far
        prepMeals.forEach(prepMeal => {
          // grab a portion of the needy meals and assign them to this prep. Minimum 1 meal.
          // if there's only 1 meal but many prep-ready meals, the latter prep-ready meals
          // just become regular meals.
          const countOfMealsToPrepFor = Math.ceil(
            mealCountLeft / prepMeals.length,
          );
          mealCountLeft -= countOfMealsToPrepFor;

          // add a cook action to cover all needed meals, plus eat for this meal.
          const cookAction = plan.addAction(
            prepMeal.dayIndex,
            prepMeal.mealIndex,
            'COOK',
            {
              servings: plan.defaultServings * (1 + countOfMealsToPrepFor),
              mealType: prepMealType(
                prepMeal.availability,
                (1 + countOfMealsToPrepFor) * plan.defaultServings,
              ),
            },
          );
          plan.addAction(prepMeal.dayIndex, prepMeal.mealIndex, 'EAT', {
            cookActionId: cookAction.id,
          });

          // grab the prepped meals from the list and apply them
          for (let i = 0; i < countOfMealsToPrepFor; i++) {
            const preppedMeal = needPrepMeals.shift();
            plan.addAction(preppedMeal.dayIndex, preppedMeal.mealIndex, 'EAT', {
              cookActionId: cookAction.id,
              leftovers: true,
            });
          }
        });

        needPrepMeals = [];
        prepMeals = [];
      }

      if (!alreadyPlanned(currentMeal)) {
        prepMeals.push(currentMeal);
      }
    } else if (
      currentMeal.availability === 'NONE' &&
      !alreadyPlanned(currentMeal)
    ) {
      // note: if we don't have any prep meals ready, we can catch this on the next round
      if (prepMeals.length > 0) {
        needPrepMeals.push(currentMeal);
      }
    } else if (
      currentMeal.availability === 'SHORT' &&
      !alreadyPlanned(currentMeal)
    ) {
      // short stuff just gets assigned like normal, no sense prepping on these meals
      const cookAction = plan.addAction(
        currentMeal.dayIndex,
        currentMeal.mealIndex,
        'COOK',
        {
          mealType: 'QUICK',
        },
      );
      plan.addAction(currentMeal.dayIndex, currentMeal.mealIndex, 'EAT', {
        cookActionId: cookAction.id,
      });
    } else if (!alreadyPlanned(currentMeal)) {
      // eat out is transparently copied over
      plan.addAction(currentMeal.dayIndex, currentMeal.mealIndex, 'EAT_OUT');
    }

    pointer = (pointer + 1) % mealList.length;
  }

  if (totalIterations > 28 && !plan.fullyPrepared) {
    logger.warn(JSON.stringify(plan.toJSON()));
    throw new Error(
      'Something went wrong while planning. You might want to check with support.',
    );
  }

  return plan;
};
