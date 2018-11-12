import plan from '../index';
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
    variety.strategy = 'PREP';
    expect(ignoreIds(plan.run(variety, 0).toJSON())).toMatchSnapshot();
  });

  test('for midweek grocery day', () => {
    midweekGrocery.strategy = 'PREP';
    expect(ignoreIds(plan.run(midweekGrocery, 0).toJSON())).toMatchSnapshot();
  });

  test('for a large family plan', () => {
    largeFamily.strategy = 'PREP';
    expect(ignoreIds(plan.run(largeFamily, 0).toJSON())).toMatchSnapshot();
  });

  test('for a really busy person', () => {
    busy.strategy = 'PREP';
    expect(ignoreIds(plan.run(busy, 0).toJSON())).toMatchSnapshot();
  });

  test('a basic plan', () => {
    basic.strategy = 'PREP';
    expect(ignoreIds(plan.run(basic, 0).toJSON())).toMatchSnapshot();
  });

  describe('nefarious cases', () => {
    test('no time', () => {
      nefarious.noTime.strategy = 'PREP';
      expect(() =>
        ignoreIds(plan.run(nefarious.noTime, 0).toJSON()),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, we couldn't figure out where to start this plan based on your schedule."`,
      );
    });

    test('eating out all the time', () => {
      nefarious.eatOut.strategy = 'PREP';
      expect(() =>
        ignoreIds(plan.run(nefarious.eatOut, 0).toJSON()),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, we couldn't figure out where to start this plan based on your schedule."`,
      );
    });
  });
});
