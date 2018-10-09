export default plan => {
  const simpleActionAssignment = (meal, mealDay, mealIndex) => {
    switch (meal.availability) {
      case 'LONG':
        return [
          {
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'FANCY',
          },
          { type: 'EAT', mealIndex, mealDay },
        ];
      case 'MEDIUM':
        return [
          {
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'NORMAL',
          },
          { type: 'EAT', mealIndex, mealDay },
        ];
      case 'SHORT':
        return [
          {
            type: 'COOK',
            servings: plan.servingsPerMeal,
            mealType: 'QUICK',
          },
          { type: 'EAT', mealIndex, mealDay },
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
      meals: day.meals.map((meal, mealIndex) => ({
        ...meal,
        actions: simpleActionAssignment(meal, idx, mealIndex),
      })),
    })),
  };
};
