import plan from '../index';
import plans from './createPlans';
const { variety } = plans();

describe('basic meal plan', () => {
  test('converts availability to meal types', () => {
    variety.strategy = 'BASIC';
    expect(plan.run(variety)).toMatchSnapshot();
  });
});
