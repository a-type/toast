import Plan from '../Plan';
import createPlans from '../../services/planner/__tests__/createPlans';
const { variety } = createPlans();

describe('the Plan class', () => {
  describe('from availability', () => {
    let plan;

    beforeEach(() => {
      plan = new Plan(variety.toJSON());
    });

    test('counts availability days', () => {
      expect(plan.countMealsWithAvailability('SHORT')).toEqual(5);
    });

    test('lists meals', () => {
      expect(plan.meals).toHaveLength(21);
    });
  });
});
