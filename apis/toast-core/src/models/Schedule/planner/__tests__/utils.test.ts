import { initializeWeek } from '../utils';

describe('planning utils', () => {
  describe('initializeWeek', () => {
    test('for a basic week', () => {
      const week = initializeWeek();
      expect(week.length).toEqual(21);
      expect(week[0].dayIndex).toEqual(0);
      expect(week[0].dateIndex).toEqual(0);
      expect(week[0].mealIndex).toEqual(0);
      expect(week[20].dayIndex).toEqual(6);
      expect(week[20].dateIndex).toEqual(6);
      expect(week[20].mealIndex).toEqual(2);
    });
  });
});
