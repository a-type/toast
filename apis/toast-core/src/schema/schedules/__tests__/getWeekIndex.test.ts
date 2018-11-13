import getWeekIndex from '../weeks/getWeekIndex';

describe('getWeekIndex helper', () => {
  test('gets 0 weeks', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 9,
        date: 7,
        startDay: new Date(2018, 9, 7),
      }),
    ).toEqual(0);
  });

  test('gets a week from a midweek day', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 9,
        date: 10,
        startDay: new Date(2018, 9, 7),
      }),
    ).toEqual(0);
  });

  test('gets 1 week', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 9,
        date: 14,
        startDay: new Date(2018, 9, 7),
      }),
    ).toEqual(1);
  });

  test('gets -1 week', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 8,
        date: 30,
        startDay: new Date(2018, 9, 7),
      }),
    ).toEqual(-1);
  });

  test('across months', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 10,
        date: 5,
        startDay: new Date(2018, 9, 7),
      }),
    ).toEqual(4);
  });
});
