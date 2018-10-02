export const getNeededPrepServingsRanges = meals => {
  const neededPrepServingsRanges = [0];
  const incrementLast = () =>
    neededPrepServingsRanges[neededPrepServingsRanges.length - 1]++;
  meals.forEach(meal => {
    if (meal.availability === 'NONE') {
      incrementLast();
    } else if (meal.availability === 'LONG') {
      neededPrepServingsRanges.push(0);
    }
  });

  return neededPrepServingsRanges;
};

/**
 * "scroll" to the first instance of a particular set of availability in a
 * list of meals
 */
export const scroll = (list, scrollToAvailability = ['LONG']) => {
  const indexOfFirstLongDay = list.findIndex(meal =>
    scrollToAvailability.includes(meal.availability),
  );
  return [
    ...list.slice(indexOfFirstLongDay),
    ...list.slice(0, indexOfFirstLongDay),
  ];
};

export const getMealsByType = mealList => {
  ['long', 'medium', 'short', 'none'].reduce(
    (counts, type) => ({
      ...counts,
      [type]: mealList.filter(meal => meal.availability.toLowerCase() === type),
    }),
    {},
  );
};

export const toMealList = plan =>
  plan.days.reduce(
    (allMeals, day) => [...allMeals, day.breakfast, day.lunch, day.dinner],
    [],
  );

export const getPlanStrategy = plan => {
  let mealListWithoutBreakfast = toMealList(plan).filter(
    ({ meal }) => meal !== 'breakfast',
  );
  const mealsByType = getMealsByType(mealListWithoutBreakfast);

  if (mealsByType.long.length === 0 && mealsByType.none.length > 0) {
    return 'eatOutOnNones';
  }

  if (mealsByType.none.length === 0) {
    return 'basic';
  }

  if (
    mealsByType.long.length + mealsByType.medium.length >=
    mealsByType.none.length
  ) {
    return 'doublePortions';
  }

  if (
    mealsByType.long.length > 0 &&
    mealsByType.none.length / mealsByType.long.length <= 3
  ) {
    return 'prep';
  }

  if (
    mealsByType.long.length > 0 &&
    mealsByType.none.length / mealsByType.long.length <= 5
  ) {
    return 'bigPrep';
  }

  return 'bigPrepAndEatOut';
};

export const getMealById = (id, plan) => {
  const [day, meal] = id.split('.');
  const dayIdx = parseInt(day);
  return plan.days[dayIdx][meal];
};
