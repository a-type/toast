import plan from '../index';
import plans from './createPlans';
const {
  variety,
  largeFamily,
  busy,
  nefarious,
  prePlanned,
  basicPlanned,
} = plans();

describe('prep meal plan', () => {
  test('for a variety plan', () => {
    variety.strategy = 'PREP';
    expect(plan.run(variety)).toMatchSnapshot();
  });

  test('for a large family plan', () => {
    largeFamily.strategy = 'PREP';
    expect(plan.run(largeFamily)).toMatchSnapshot();
  });

  test('for a really busy person', () => {
    busy.strategy = 'PREP';
    expect(plan.run(busy)).toMatchSnapshot();
  });

  test('a pre-planned plan', () => {
    prePlanned.strategy = 'PREP';
    expect(plan.run(prePlanned)).toMatchSnapshot();
  });

  test('a pre-planned basic plan', () => {
    basicPlanned.strategy = 'PREP';
    expect(plan.run(basicPlanned)).toMatchSnapshot();
  });

  describe('nefarious cases', () => {
    test('no time', () => {
      nefarious.noTime.strategy = 'PREP';
      expect(() =>
        plan.run(nefarious.noTime),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, but you don't seem to have enough free time to prepare meals! You need at least one day with an hour or so"`,
      );
    });

    test('eating out all the time', () => {
      nefarious.eatOut.strategy = 'PREP';
      expect(() =>
        plan.run(nefarious.eatOut),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, but you don't seem to have enough free time to prepare meals! You need at least one day with an hour or so"`,
      );
    });
  });
});
