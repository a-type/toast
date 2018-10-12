import getWeekIndex from '../getWeekIndex';

describe('getWeekIndex helper', () => {
  test('gets 0 weeks', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 10,
        day: 7,
        startDay: new Date(2018, 10, 7),
      }),
    ).toEqual(0);
  });

  test('gets 1 week', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 10,
        day: 14,
        startDay: new Date(2018, 10, 7),
      }),
    ).toEqual(0);
  });

  test('gets -1 week', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 9,
        day: 30,
        startDay: new Date(2018, 10, 7),
      }),
    ).toEqual(0);
  });

  test('across months', () => {
    expect(
      getWeekIndex({
        year: 2018,
        month: 11,
        day: 5,
        startDay: new Date(2018, 10, 7),
      }),
    ).toEqual(5);
  });
});
