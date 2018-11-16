import Schedule from '../Schedule';
import createPlans from '../Meal/planner/__tests__/createPlans';
const { variety } = createPlans();

describe('the Schedule class', () => {
  describe('from availability', () => {
    let plan;

    beforeEach(() => {
      plan = new Schedule(variety.toJSON());
    });

    test('counts availability days', () => {
      expect(plan.countMealsWithAvailability('SHORT')).toEqual(5);
    });

    test('lists meals', () => {
      expect(plan.meals).toHaveLength(21);
    });
  });
});
