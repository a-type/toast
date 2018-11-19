import { MealActionType } from 'generated/schema';

export default (actionType: MealActionType): string => {
  switch (actionType) {
    case MealActionType.COOK:
      return 'Cook';
    case MealActionType.EAT:
      return 'Eat';
    case MealActionType.EAT_OUT:
      return 'Eat out';
    case MealActionType.READY_MADE:
      return 'Ready-made meal';
    default:
      return 'Skip';
  }
};
