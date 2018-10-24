export default plan => {
  plan.reset();

  plan.days.forEach((day, dayIndex) => {
    day.meals.forEach((meal, mealIndex) => {
      const mealType = {
        LONG: 'FANCY',
        MEDIUM: 'NORMAL',
        SHORT: 'QUICK',
      }[meal.availability];
      if (mealType) {
        const cookAction = plan.addAction(dayIndex, mealIndex, 'COOK', {
          mealType,
        });
        plan.addAction(dayIndex, mealIndex, 'EAT', {
          cookActionId: cookAction.id,
        });
      } else {
        plan.addAction(dayIndex, mealIndex, 'SKIP');
      }
    });
  });

  return plan;
};
