import plan from '../index';
import { variety, largeFamily, busy, nefarious, prePlanned } from './plans';

describe('prep meal plan', () => {
  test('for a variety plan', () => {
    expect(plan.run(variety, 'PREP')).toMatchSnapshot();
  });

  test('for a large family plan', () => {
    expect(plan.run(largeFamily, 'PREP')).toMatchSnapshot();
  });

  test('for a really busy person', () => {
    expect(plan.run(busy, 'PREP')).toMatchSnapshot();
  });

  test('a pre-planned plan', () => {
    expect(plan.run(prePlanned, 'PREP')).toMatchSnapshot();
  });

  describe('nefarious cases', () => {
    test('no time', () => {
      expect(() =>
        plan.run(nefarious.noTime, 'PREP'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, but you don't seem to have enough free time to prepare meals! You need at least one day with an hour or so"`,
      );
    });

    test('eating out all the time', () => {
      expect(() =>
        plan.run(nefarious.eatOut, 'PREP'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, but you don't seem to have enough free time to prepare meals! You need at least one day with an hour or so"`,
      );
    });
  });
});
