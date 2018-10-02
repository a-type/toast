import { toMealList, getMealById } from './utils';

const prepMealType = (prepMeal, needPrepMealCount, servingsPerMeal) => {
  if ((needPrepMealCount + 1) * servingsPerMeal > 8) {
    return 'BIG';
  }

  if (needPrepMealCount === 0) {
    return prepMeal.availability === 'LONG' ? 'FANCY' : 'NORMAL';
  }

  if (prepMeal.availability === 'LONG') {
    return 'NORMAL';
  }

  return 'QUICK';
};

const alreadyPlanned = meal =>
  meal.actions &&
  meal.actions.some(action => ['EAT', 'EAT_OUT', 'SKIP'].includes(action.type));

const getPlannedMeals = mealList => mealList.filter(alreadyPlanned).length;

export default plan => {
  // skip breakfast for main planning
  const mealList = toMealList(plan).filter(meal => meal.meal !== 'breakfast');

  let pointer = 0;
  let prepMealIds = [];

  let needPrepMeals = [];

  while (getPlannedMeals(mealList) < mealList.length) {
    // WARNING: pretty brittle. based on the number of meals per day represented in list
    const dayPointer = Math.floor(pointer / 2);

    // L / M meals count as 'prep-ready'; i.e. we can increase their portions by decreasing
    // the complexity of the recipe so we can distribute portions to later "N" meals
    if (['LONG', 'MEDIUM'].includes(mealList[pointer].availability)) {
      // if we already are tracking some prep candidates AND we already have meals which
      // need prepping, trigger the 'flush' behavior that goes ahead and correlates
      // prep meals to prepped meals
      if (
        (prepMealIds.length > 0 && needPrepMeals.length > 0) ||
        // edge case: this is the last meal left
        getPlannedMeals(mealList) === mealList.length - 1
      ) {
        // keep track of how many meals we still need to plan
        let mealCountLeft = needPrepMeals.length;
        console.info('FLUSH');
        console.info('mealCountLeft ', mealCountLeft);

        // iterate through 'prep-ready' meals we have collected so far
        prepMealIds.forEach(prepMealId => {
          console.info(prepMealId);
          const prepMeal = getMealById(prepMealId, plan);
          // grab a portion of the needy meals and assign them to this prep. Minimum 1 meal.
          // if there's only 1 meal but many prep-ready meals, the latter prep-ready meals
          // just become regular meals.
          const countOfMealsToPrepFor = Math.ceil(
            mealCountLeft / prepMealIds.length,
          );
          mealCountLeft -= countOfMealsToPrepFor;
          console.info('countOfMealsToPrepFor ', countOfMealsToPrepFor);

          // add a cook action to cover all needed meals, plus eat for this meal.
          prepMeal.actions = [
            {
              type: 'COOK',
              servings: plan.servingsPerMeal * (1 + countOfMealsToPrepFor),
              mealType: prepMealType(
                prepMeal,
                countOfMealsToPrepFor,
                plan.servingsPerMeal,
              ),
            },
            {
              type: 'EAT',
              mealId: prepMealId,
              leftovers: false,
            },
          ];

          // grab the prepped meals from the list and apply them
          for (let i = 0; i < countOfMealsToPrepFor; i++) {
            const preppedMeal = needPrepMeals.shift();
            console.info('prepping: ', preppedMeal);
            preppedMeal.actions = [
              {
                type: 'EAT',
                mealId: prepMealId,
                leftovers: true,
              },
            ];
          }
        });

        needPrepMeals = [];
        prepMealIds = [];
      }

      if (!alreadyPlanned(mealList[pointer])) {
        prepMealIds.push(`${dayPointer}.${mealList[pointer].meal}`);
      }
    } else if (mealList[pointer].availability === 'NONE') {
      // note: if we don't have any prep meals ready, we can catch this on the next round
      if (prepMealIds.length > 0 && !alreadyPlanned(mealList[pointer])) {
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
          mealId: `${dayPointer}.${mealList[pointer].meal}`,
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
    console.info(`Iteration done: pointer ${pointer}`);
    console.info('prepMealIds ', prepMealIds);
    console.info('needPrep ', needPrepMeals);
  }

  const breakfasts = toMealList(plan).filter(meal => meal.meal === 'breakfast');
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
