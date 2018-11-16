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

const startDateIndex = 0;
const endDateIndex = 6;

describe('prep meal plan', () => {
  test('for a variety plan', () => {
    variety.strategy = ScheduleStrategy.Prep;
    expect(
      ignoreIds(
        plan.run(variety, startDateIndex, endDateIndex).map(m => m.toJSON()),
      ),
    ).toMatchSnapshot();
  });

  test('for midweek grocery day', () => {
    midweekGrocery.strategy = ScheduleStrategy.Prep;
    expect(
      ignoreIds(
        plan
          .run(midweekGrocery, startDateIndex, endDateIndex)
          .map(m => m.toJSON()),
      ),
    ).toMatchSnapshot();
  });

  test('for a large family plan', () => {
    largeFamily.strategy = ScheduleStrategy.Prep;
    expect(
      ignoreIds(
        plan
          .run(largeFamily, startDateIndex, endDateIndex)
          .map(m => m.toJSON()),
      ),
    ).toMatchSnapshot();
  });

  test('for a really busy person', () => {
    busy.strategy = ScheduleStrategy.Prep;
    expect(
      ignoreIds(
        plan.run(busy, startDateIndex, endDateIndex).map(m => m.toJSON()),
      ),
    ).toMatchSnapshot();
  });

  test('a basic plan', () => {
    basic.strategy = ScheduleStrategy.Prep;
    expect(
      ignoreIds(
        plan.run(basic, startDateIndex, endDateIndex).map(m => m.toJSON()),
      ),
    ).toMatchSnapshot();
  });

  describe('nefarious cases', () => {
    test('no time', () => {
      nefarious.noTime.strategy = ScheduleStrategy.Prep;
      expect(() =>
        ignoreIds(
          plan
            .run(nefarious.noTime, startDateIndex, endDateIndex)
            .map(m => m.toJSON()),
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, we couldn't figure out where to start this plan based on your schedule."`,
      );
    });

    test('eating out all the time', () => {
      nefarious.eatOut.strategy = ScheduleStrategy.Prep;
      expect(() =>
        ignoreIds(
          plan
            .run(nefarious.eatOut, startDateIndex, endDateIndex)
            .map(m => m.toJSON()),
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, we couldn't figure out where to start this plan based on your schedule."`,
      );
    });
  });
});
