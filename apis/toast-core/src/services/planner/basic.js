export default plan => {
  const simpleActionAssignment = (meal, mealType, dayIdx) => {
    const mealId = `${dayIdx}.${mealType}`;
    switch (meal.availability) {
      case 'LONG':
        return [
          {
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'FANCY',
          },
          { type: 'EAT', mealId },
        ];
      case 'MEDIUM':
        return [
          {
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'NORMAL',
          },
          { type: 'EAT', mealId },
        ];
      case 'SHORT':
        return [
          {
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'QUICK',
          },
          { type: 'EAT', mealId },
        ];
      case 'NONE':
      case 'EAT_OUT':
        return [{ type: 'EAT_OUT' }];
    }
  };

  return {
    ...plan,
    days: plan.days.map((day, idx) => ({
      ...day,
      breakfast: {
        ...day.breakfast,
        actions: simpleActionAssignment(day.breakfast, 'breakfast', idx),
      },
      lunch: {
        ...day.lunch,
        actions: simpleActionAssignment(day.lunch, 'lunch', idx),
      },
      dinner: {
        ...day.dinner,
        actions: simpleActionAssignment(day.dinner, 'dinner', idx),
      },
    })),
  };
};
