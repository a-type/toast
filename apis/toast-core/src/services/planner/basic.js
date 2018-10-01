import { id } from 'tools';

export default plan => {
  const simpleActionAssignment = meal => {
    const mealId = id();
    switch (meal.availability) {
      case 'LONG':
        return [
          {
            id: mealId,
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'FANCY',
          },
          { id: id(), type: 'EAT', prepActionId: mealId },
        ];
      case 'MEDIUM':
        return [
          {
            id: mealId,
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'NORMAL',
          },
          { id: id(), type: 'EAT', prepActionId: mealId },
        ];
      case 'SHORT':
        return [
          {
            id: mealId,
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'QUICK',
          },
          { id: id(), type: 'EAT', prepActionId: mealId },
        ];
      case 'NONE':
        return [{ type: 'EAT_OUT' }];
    }
  };

  return {
    ...plan,
    days: plan.days.map(day => ({
      ...day,
      breakfast: {
        ...day.breakfast,
        actions: simpleActionAssignment(day.breakfast),
      },
      lunch: {
        ...day.lunch,
        actions: simpleActionAssignment(day.lunch),
      },
      dinner: {
        ...day.dinner,
        actions: simpleActionAssignment(day.dinner),
      },
    })),
  };
};
