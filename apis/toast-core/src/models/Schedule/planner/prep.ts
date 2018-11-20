import logger from 'logger';
import { Schedule, Meal } from 'models';
import { MealActionType } from 'models/Meal/Meal';

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

const alreadyPlanned = (meal: Meal): boolean =>
  meal.actions &&
  meal.actions.some(action =>
    ['EAT', 'EAT_OUT', 'READY_MADE', 'SKIP'].includes(action.type),
  );

export default (schedule: Schedule, baseMeals: Meal[]): Meal[] => {
  let prepMeals: Meal[] = [];
  let needPrepMeals: Meal[] = [];

  const indexOfFirstCook = schedule.meals.findIndex(sm =>
    ['LONG', 'MEDIUM'].includes(sm.availability),
  );
  const meals = [
    ...baseMeals.slice(indexOfFirstCook),
    ...baseMeals.slice(0, indexOfFirstCook),
  ];

  const flushPrepMeals = () => {
    // keep track of how many meals we still need to schedule
    let mealCountLeft = needPrepMeals.length;

    // iterate through 'prep-ready' meals we have collected so far
    prepMeals.forEach(prepMeal => {
      const prepScheduleMeal = schedule.getScheduleMeal(
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
        type: MealActionType.Cook,
        servings: schedule.defaultServings * (1 + countOfMealsToPrepFor),
        recipeType: prepMealType(
          prepScheduleMeal.availability,
          (1 + countOfMealsToPrepFor) * schedule.defaultServings,
        ),
      };
      const finalCookAction = prepMeal.addAction(cookAction);

      const eatAction = {
        type: MealActionType.Eat,
        cookActionId: finalCookAction.id,
        leftovers: false,
      };

      // add both actions to corresponding meal in week
      prepMeal.addAction(eatAction);

      // grab the prepped meals from the list and apply them
      for (let i = 0; i < countOfMealsToPrepFor; i++) {
        const leftoverMeal = needPrepMeals.shift();
        // accomodate crossing the week boundary: meals which come before the meals
        // that cook for them should reference cook meals one week prior
        let cookActionId = finalCookAction.id;
        if (leftoverMeal.dayIndex < prepMeal.dayIndex) {
          cookActionId = Meal.moveActionId(cookActionId, -1);
        }
        const leftoverAction = {
          dayIndex: leftoverMeal.dayIndex,
          mealIndex: leftoverMeal.mealIndex,
          type: MealActionType.Eat,
          cookActionId,
          leftovers: true,
        };
        leftoverMeal.addAction(leftoverAction);
      }
    });

    // reset both queues
    needPrepMeals = [];
    prepMeals = [];
  };

  for (let pointer = 0; pointer < meals.length; pointer++) {
    const currentMeal = meals[pointer];
    const dayIndex = currentMeal.dayIndex;
    const mealIndex = currentMeal.mealIndex;

    if (mealIndex === 0) {
      // TODO: breakfast
      continue;
    }

    const scheduleMeal = schedule.getScheduleMeal(dayIndex, mealIndex);

    if (!scheduleMeal) {
      continue;
    }

    // L / M meals count as 'prep-ready'; i.e. we can increase their portions by decreasing
    // the complexity of the recipe so we can distribute portions to later "N" meals
    if (['LONG', 'MEDIUM'].includes(scheduleMeal.availability)) {
      // if we already are tracking some prep candidates AND we already have meals which
      // need prepping, trigger the 'flush' behavior that goes ahead and correlates
      // prep meals to prepped meals
      if (prepMeals.length > 0 && needPrepMeals.length > 0) {
        flushPrepMeals();
      } else if (needPrepMeals.length > 0 && prepMeals.length === 0) {
        // if we have no prep-ready meals but we do have a list of meals that need prep,
        // those meals will need to be prepped by
      }

      if (!alreadyPlanned(currentMeal)) {
        prepMeals.push(currentMeal);
      }
    } else if (
      scheduleMeal.availability === 'NONE' &&
      !alreadyPlanned(currentMeal)
    ) {
      // note: if we don't have any prep meals ready, we can catch this on the next round
      if (prepMeals.length > 0) {
        needPrepMeals.push(currentMeal);
      }
    } else if (
      scheduleMeal.availability === 'SHORT' &&
      !alreadyPlanned(currentMeal)
    ) {
      // short stuff just gets assigned like normal, no sense prepping on these meals
      const cookActionData = {
        type: MealActionType.Cook,
        recipeType: 'QUICK',
        servings: schedule.defaultServings,
      };
      const cookAction = currentMeal.addAction(cookActionData);
      const eatAction = {
        type: MealActionType.Eat,
        cookActionId: cookAction.id,
        leftovers: false,
      };
      currentMeal.addAction(eatAction);
    } else if (!alreadyPlanned(currentMeal)) {
      // eat out is transparently copied over
      const eatOutAction = {
        type: MealActionType.EatOut,
      };
      currentMeal.addAction(eatOutAction);
    }
  }

  // add cooking to any trailing 'prep-ready' meals.
  flushPrepMeals();

  // return to default week ordering
  const firstMealIndex = meals.findIndex(
    meal => meal.mealIndex === 0 && meal.dayIndex === 0,
  );
  return [...meals.slice(firstMealIndex), ...meals.slice(0, firstMealIndex)];
};
