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
  while (plannedMeals < mealList.length) {
    if (['LONG', 'MEDIUM'].includes(mealList[pointer].availability)) {
      if (prepMeal === mealList[pointer]) {
        // assign and reset
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

      if (!prepMeal) {
        prepMeal = mealList[pointer];
      } else {
        const mealId = id();
        mealList[pointer].actions = [
          {
            id: mealId,
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType:
              mealList[pointer].availability === 'LONG' ? 'FANCY' : 'NORMAL',
          },
          {
            id: id(),
            type: 'EAT',
            prepActionId: mealId,
            leftovers: false,
          },
        ];
        plannedMeals += 1;
      }
    } else if (mealList[pointer].availability === 'NONE') {
      needPrepMeals.push(mealList[pointer]);
    } else if (mealList[pointer].availability === 'SHORT') {
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
      mealList[pointer].actions = [
        {
          id: id(),
          type: 'EAT_OUT',
        },
      ];
      plannedMeals += 1;
    }

    pointer = pointer + 1 % mealList.length;
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
