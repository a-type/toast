import { MealAction, MealActionType, PlanMeal } from 'generated/schema';

export default (meals: Partial<PlanMeal>[]): MealAction | null => {
  const actions = meals.reduce(
    (allActions, meal) => [...allActions, ...meal.actions],
    [],
  );

  const proiritizedActionTypes: MealActionType[] = [
    MealActionType.COOK,
    MealActionType.EAT,
    MealActionType.EAT_OUT,
    MealActionType.READY_MADE,
    MealActionType.SKIP,
  ];

  for (let i in proiritizedActionTypes) {
    const t = proiritizedActionTypes[i];
    const action = actions.find(action => action.type === t);
    if (action) {
      return action;
    }
  }

  return null;
};
