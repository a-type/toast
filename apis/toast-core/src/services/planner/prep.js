import { toMealList } from './utils';
import { clone } from 'ramda';

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
  meal.actions.some(action => ['EAT', 'EAT_OUT', 'SKIP'].includes(action.type));

const getPlannedMeals = mealList => mealList.filter(alreadyPlanned).length;

export default _plan => {
  const plan = clone(_plan);

  // reset actions for a new plan
  if (plan.days) {
    plan.days.forEach(day => {
      if (day.meals) {
        day.meals.forEach(meal => {
          meal.actions = [];
        });
      } else {
        day.meals = [];
      }
    });
  } else {
    plan.days = [];
  }

  plan.warnings = [];
  // skip breakfast for main planning
  const mealList = toMealList(plan).filter((meal, index) => index % 3 !== 0);

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
    plan.warnings.push(
      `You don't seem to have a lot of time to prep meals! You'll need to prep ${totalNones} meals in only ${totalPrepCandidates} day${
        totalPrepCandidates > 1 ? 's' : ''
      }. You can make your schedule more realistic by switching some meals to eating out.`,
    );
  }

  let pointer = 0;
  let prepMealTuples = [];
  let needPrepMeals = [];
  let totalIterations = 0;

  while (getPlannedMeals(mealList) < mealList.length && totalIterations < 24) {
    // WARNING: pretty brittle. based on the number of meals per day represented in list
    const dayPointer = Math.floor(pointer / 2);
    const mealIndex = 1 + pointer % 2;

    // L / M meals count as 'prep-ready'; i.e. we can increase their portions by decreasing
    // the complexity of the recipe so we can distribute portions to later "N" meals
    if (['LONG', 'MEDIUM'].includes(mealList[pointer].availability)) {
      // if we already are tracking some prep candidates AND we already have meals which
      // need prepping, trigger the 'flush' behavior that goes ahead and correlates
      // prep meals to prepped meals
      if (
        (prepMealTuples.length > 0 && needPrepMeals.length > 0) ||
        // edge case: this is the last meal left
        getPlannedMeals(mealList) === mealList.length - 1
      ) {
        // keep track of how many meals we still need to plan
        let mealCountLeft = needPrepMeals.length;

        // iterate through 'prep-ready' meals we have collected so far
        prepMealTuples.forEach(prepMealTuple => {
          const [prepMealDay, prepMealIndex] = prepMealTuple;
          const prepMeal = plan.days[prepMealDay].meals[prepMealIndex];
          // grab a portion of the needy meals and assign them to this prep. Minimum 1 meal.
          // if there's only 1 meal but many prep-ready meals, the latter prep-ready meals
          // just become regular meals.
          const countOfMealsToPrepFor = Math.ceil(
            mealCountLeft / prepMealTuples.length,
          );
          mealCountLeft -= countOfMealsToPrepFor;

          // add a cook action to cover all needed meals, plus eat for this meal.
          prepMeal.actions = [
            {
              type: 'COOK',
              servings: plan.servingsPerMeal * (1 + countOfMealsToPrepFor),
              mealType: prepMealType(
                prepMeal.availability,
                (1 + countOfMealsToPrepFor) * plan.servingsPerMeal,
              ),
            },
            {
              type: 'EAT',
              mealDay: prepMealDay,
              mealIndex: prepMealIndex,
              leftovers: false,
            },
          ];

          // grab the prepped meals from the list and apply them
          for (let i = 0; i < countOfMealsToPrepFor; i++) {
            const preppedMeal = needPrepMeals.shift();
            preppedMeal.actions = [
              {
                type: 'EAT',
                mealDay: prepMealDay,
                mealIndex: prepMealIndex,
                leftovers: true,
              },
            ];
          }
        });

        needPrepMeals = [];
        prepMealTuples = [];
      }

      if (!alreadyPlanned(mealList[pointer])) {
        prepMealTuples.push([dayPointer, mealIndex]);
      }
    } else if (mealList[pointer].availability === 'NONE') {
      // note: if we don't have any prep meals ready, we can catch this on the next round
      if (prepMealTuples.length > 0 && !alreadyPlanned(mealList[pointer])) {
        needPrepMeals.push(mealList[pointer]);
      }
    } else if (mealList[pointer].availability === 'SHORT') {
      // short stuff just gets assigned like normal, no sense prepping on these meals
      mealList[pointer].actions = [
        {
          type: 'COOK',
          servings: plan.servingsPerMeal,
          mealType: 'QUICK',
        },
        {
          type: 'EAT',
          mealDay: dayPointer,
          mealIndex,
          leftovers: false,
        },
      ];
    } else {
      // eat out is transparently copied over
      mealList[pointer].actions = [
        {
          type: 'EAT_OUT',
        },
      ];
    }

    pointer = (pointer + 1) % mealList.length;
    totalIterations++;
  }

  if (totalIterations === 24 && getPlannedMeals(mealList) < mealList.length) {
    throw new Error(
      'Something went wrong while planning. You might want to check with support.',
    );
  }

  const breakfasts = toMealList(plan).filter((meal, index) => index % 3 === 0);
  // TODO...
  breakfasts.forEach(meal => {
    meal.actions = [
      {
        type: 'EAT_OUT',
      },
    ];
  });

  return plan;
};
