import Plan from '../Plan';
import createPlans from '../../services/planner/__tests__/createPlans';
const { variety, prePlanned } = createPlans();

describe('the Plan class', () => {
  describe('from availability', () => {
    let plan;

    beforeEach(() => {
      plan = new Plan(variety);
    });

    test('counts availability days', () => {
      expect(plan.countMealsWithAvailability('SHORT')).toEqual(5);
    });

    test('shows planned state', () => {
      expect(plan.fullyPrepared).toEqual(false);
    });

    test('lists meals', () => {
      expect(plan.listMeals()).toHaveLength(21);
    });
  });

  describe('from an existing plan', () => {
    let plan;

    beforeEach(() => {
      plan = new Plan(prePlanned);
    });

    test('preserves original data', () => {
      expect(plan.days[0].meals[2].actions[0].mealType).toEqual('FANCY');
    });
  });
});
