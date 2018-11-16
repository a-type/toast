import { Schedule, Meal } from 'models';
import { MealActionType } from 'models/Meal/Meal';

export default (schedule: Schedule, meals: Meal[]): Meal[] => {
  meals.forEach(meal => {
    const ScheduleMeal = schedule.getMeal(meal.dayIndex, meal.mealIndex);
    const mealType = {
      LONG: 'FANCY',
      MEDIUM: 'NORMAL',
      SHORT: 'QUICK',
    }[ScheduleMeal.availability];
    if (mealType) {
      const cookActionData = {
        type: MealActionType.Cook,
        mealType,
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
          ScheduleMeal.availability === 'EAT_OUT'
            ? MealActionType.EatOut
            : MealActionType.Skip,
      });
    }
  });

  return meals;
};
