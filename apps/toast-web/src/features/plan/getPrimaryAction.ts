import { MealAction, MealActionType, PlanMeal } from 'generated/schema';

export default (meal: Partial<PlanMeal>): MealAction | null => {
  const { actions } = meal;

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
