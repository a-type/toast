import { PlanAction, PlanActionType, PlanWeekMeal } from 'generated/schema';

export default (meal: Partial<PlanWeekMeal>): PlanAction | null => {
  const { actions } = meal;

  const proiritizedActionTypes: PlanActionType[] = [
    PlanActionType.COOK,
    PlanActionType.EAT,
    PlanActionType.EAT_OUT,
    PlanActionType.READY_MADE,
    PlanActionType.SKIP,
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
