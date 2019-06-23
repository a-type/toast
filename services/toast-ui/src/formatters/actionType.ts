export enum MealActionType {
  EAT_OUT = 'EAT_OUT',
  COOK = 'COOK',
  EAT = 'EAT',
  READY_MADE = 'READY_MADE',
  SKIP = 'SKIP',
}

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
