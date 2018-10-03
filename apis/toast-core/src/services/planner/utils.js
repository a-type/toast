export const toMealList = plan =>
  plan.days.reduce((allMeals, day) => [...allMeals, ...day.meals], []);
