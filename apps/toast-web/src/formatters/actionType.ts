import { PlanActionType } from 'generated/schema';

export default (actionType: PlanActionType): string => {
  switch (actionType) {
    case PlanActionType.COOK:
      return 'Cook';
    case PlanActionType.EAT:
      return 'Eat';
    case PlanActionType.EAT_OUT:
      return 'Eat out';
    case PlanActionType.READY_MADE:
      return 'Ready-made meal';
    default:
      return 'Skip';
  }
};
