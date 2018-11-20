import plan from '../index';
import { ScheduleStrategy } from 'models/Schedule/Schedule';
import plans from './createPlans';
const { variety } = plans();

describe('basic meal plan', () => {
  test('converts availability to meal types', () => {
    variety.strategy = ScheduleStrategy.Basic;
    expect(plan.run(variety).map(m => m.toJSON())).toMatchSnapshot();
  });
});
