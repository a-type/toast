import plan from '../index';
import plans from './createPlans';
import { ignoreIds } from './utils';
const { variety } = plans();

describe('basic meal plan', () => {
  test('converts availability to meal types', () => {
    variety.strategy = 'BASIC';
    expect(ignoreIds(plan.run(variety, 0).toJSON())).toMatchSnapshot();
  });
});
