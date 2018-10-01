import { toMealList } from './utils';
import { id } from 'tools';

const prepMealType = (prepMeal, needPrepMealCount, servingsPerMeal) => {
  if ((needPrepMealCount + 1) * servingsPerMeal > 8) {
    return 'BIG';
  }

  if (prepMeal.availability === 'LONG') {
    return 'NORMAL';
  }

  return 'QUICK';
};

export default plan => {
  // skip breakfast for main planning
  const mealList = toMealList(plan).filter(meal => meal.meal !== 'breakfast');

  let plannedMeals = 0;
  let pointer = 0;
  let prepMeal = null;
  let needPrepMeals = [];
  // 1 traverse in order
  while (plannedMeals < mealList.length) {
    if (['LONG', 'MEDIUM'].includes(mealList[pointer].availability)) {
      if (prepMeal) {
        // 4 assign and reset
        const prepActionId = id();
        prepMeal.actions = [
          {
            id: prepActionId,
            type: 'COOK',
            servings: plan.servingsPerMeal * (1 + needPrepMeals.length),
            mealType: prepMealType(
              prepMeal,
              needPrepMeals.length,
              plan.servingsPerMeal,
            ),
          },
          {
            id: id(),
            type: 'EAT',
            prepActionId,
            leftovers: false,
          },
        ];

        needPrepMeals.forEach(meal => {
          meal.actions = [
            {
              id: id(),
              type: 'EAT',
              prepActionId,
              leftovers: true,
            },
          ];
        });

        plannedMeals += 1 + needPrepMeals.length;
        needPrepMeals = [];
        prepMeal = null;
      }

      // 2 store encountered M / L meal
      prepMeal = mealList[pointer];
    } else if (mealList[pointer].availability === 'NONE') {
      // 3 traverse all adjacent NONEs, adding to a running list
      if (prepMeal) {
        needPrepMeals.push(mealList[pointer]);
      }
    } else if (mealList[pointer].availability === 'SHORT') {
      // short stuff just gets assigned like normal, no sense prepping on these meals
      const mealId = id();
      mealList[pointer].actions = [
        {
          id: mealId,
          type: 'COOK',
          servings: plan.servingsPerMeal,
          mealType: 'QUICK',
        },
        {
          id: id(),
          type: 'EAT',
          prepActionId: mealId,
          leftovers: false,
        },
      ];
      plannedMeals += 1;
    } else {
      // eat out is transparently copied over
      mealList[pointer].actions = [
        {
          id: id(),
          type: 'EAT_OUT',
        },
      ];
      plannedMeals += 1;
    }

    pointer = (pointer + 1) % mealList.length;
  }

  const breakfasts = toMealList(plan).filter(meal => meal.meal === 'breakfast');
  // TODO...
  breakfasts.forEach(meal => {
    meal.actions = [
      {
        id: id(),
        type: 'EAT_OUT',
      },
    ];
  });

  return plan;
};
