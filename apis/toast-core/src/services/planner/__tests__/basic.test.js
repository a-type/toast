import plan from '../index';
import { variety } from './plans';

describe('basic meal plan', () => {
  test('converts availability to meal types', () => {
    expect(plan.run(variety, 'BASIC')).toMatchSnapshot();
  });
});
