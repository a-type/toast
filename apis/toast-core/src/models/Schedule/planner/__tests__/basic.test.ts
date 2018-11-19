import plan from '../index';
import { ScheduleStrategy } from 'models/Schedule/Schedule';
import plans from './createPlans';
import { ignoreIds } from './utils';
const { variety } = plans();

describe('basic meal plan', () => {
  test('converts availability to meal types', () => {
    variety.strategy = ScheduleStrategy.Basic;
    expect(ignoreIds(plan.run(variety).map(m => m.toJSON()))).toMatchSnapshot();
  });
});
