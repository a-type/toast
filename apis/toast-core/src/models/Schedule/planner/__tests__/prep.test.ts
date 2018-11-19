import plan from '../index';
import { ScheduleStrategy } from 'models/Schedule/Schedule';
import plans from './createPlans';
import { ignoreIds } from './utils';
const {
  variety,
  largeFamily,
  busy,
  nefarious,
  basic,
  midweekGrocery,
} = plans();

describe('prep meal plan', () => {
  test('for a variety plan', () => {
    variety.strategy = ScheduleStrategy.Prep;
    expect(ignoreIds(plan.run(variety).map(m => m.toJSON()))).toMatchSnapshot();
  });

  test('for midweek grocery day', () => {
    midweekGrocery.strategy = ScheduleStrategy.Prep;
    expect(
      ignoreIds(plan.run(midweekGrocery).map(m => m.toJSON())),
    ).toMatchSnapshot();
  });

  test('for a large family plan', () => {
    largeFamily.strategy = ScheduleStrategy.Prep;
    expect(
      ignoreIds(plan.run(largeFamily).map(m => m.toJSON())),
    ).toMatchSnapshot();
  });

  test('for a really busy person', () => {
    busy.strategy = ScheduleStrategy.Prep;
    expect(ignoreIds(plan.run(busy).map(m => m.toJSON()))).toMatchSnapshot();
  });

  test('a basic plan', () => {
    basic.strategy = ScheduleStrategy.Prep;
    expect(ignoreIds(plan.run(basic).map(m => m.toJSON()))).toMatchSnapshot();
  });

  describe('nefarious cases', () => {
    test('no time', () => {
      nefarious.noTime.strategy = ScheduleStrategy.Prep;
      expect(() =>
        ignoreIds(plan.run(nefarious.noTime).map(m => m.toJSON())),
      ).toMatchSnapshot();
    });

    test('eating out all the time', () => {
      nefarious.eatOut.strategy = ScheduleStrategy.Prep;
      expect(() =>
        ignoreIds(plan.run(nefarious.eatOut).map(m => m.toJSON())),
      ).toMatchSnapshot();
    });
  });
});
