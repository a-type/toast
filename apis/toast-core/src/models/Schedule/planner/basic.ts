import { Schedule, Meal } from 'models';
import { MealActionType } from 'models/Meal/Meal';

export default (schedule: Schedule, meals: Meal[]): Meal[] => {
  meals.forEach(meal => {
    const scheduleMeal = schedule.getScheduleMeal(
      meal.dayIndex,
      meal.mealIndex,
    );

    if (!scheduleMeal) {
      return;
    }

    const recipeType = {
      LONG: 'FANCY',
      MEDIUM: 'NORMAL',
      SHORT: 'QUICK',
    }[scheduleMeal.availability];
    if (recipeType) {
      const cookActionData = {
        type: MealActionType.Cook,
        recipeType,
        servings: schedule.defaultServings,
      };

      const cookAction = meal.addAction(cookActionData);

      const eatAction = {
        type: MealActionType.Eat,
        cookActionId: cookAction.id,
        leftovers: false,
      };

      meal.addAction(eatAction);
    } else {
      meal.addAction({
        type:
          scheduleMeal.availability === 'EAT_OUT'
            ? MealActionType.EatOut
            : MealActionType.Skip,
      });
    }
  });

  return meals;
};
