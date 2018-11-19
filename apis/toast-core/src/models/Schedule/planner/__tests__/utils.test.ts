import { initializeWeek } from '../utils';
import createPlans from './createPlans';
const plans = createPlans();

describe('planning utils', () => {
  describe('initializeWeek', () => {
    test('for a basic week', () => {
      const week = initializeWeek(plans.variety);
      expect(week.length).toEqual(21);
      expect(week[0].dayIndex).toEqual(0);
      expect(week[0].mealIndex).toEqual(1);
    });

    test('for a week with a grocery day in the middle', () => {
      const week = initializeWeek(plans.midweekGrocery);
      expect(week.length).toEqual(21);
      expect(week[0].dayIndex).toEqual(4);
      expect(week[0].mealIndex).toEqual(2);
    });
  });
});
