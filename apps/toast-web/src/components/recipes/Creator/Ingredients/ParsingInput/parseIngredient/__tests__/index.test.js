import parse from '../index';

describe('ingredient parser', () => {
  test('1 cup of oats', () => {
    expect(parse('1 cup of oats')).toEqual({
      ingredient: {
        raw: 'oats',
        normalized: 'oat',
      },
      unit: {
        raw: 'cup',
        normalized: 'cup',
      },
      value: {
        raw: '1',
        normalized: 1,
      },
    });
  });

  test('1/3 tablespoon chopped onion', () => {
    expect(parse('1/3 tablespoon chopped onion')).toEqual({
      ingredient: {
        raw: 'chopped onion',
        normalized: 'chopped onion',
      },
      unit: {
        raw: 'tablespoon',
        normalized: 'tablespoon',
      },
      value: {
        raw: '1/3',
        normalized: 1 / 3.0,
      },
    });
  });

  test('four slices of white bread', () => {
    expect(parse('four slices of white bread')).toEqual({
      ingredient: {
        raw: 'white bread',
        normalized: 'white bread',
      },
      unit: {
        raw: 'slices',
        normalized: 'slice',
      },
      value: {
        raw: 'four',
        normalized: 4,
      },
    });
  });

  test('four', () => {
    expect(parse('four')).toEqual({
      value: {
        raw: 'four',
        normalized: 4,
      },
      unit: {
        raw: null,
        normalized: null,
      },
      ingredient: {
        raw: null,
        normalized: null,
      },
    });
  });

  test('1 egg', () => {
    expect(parse('1 egg')).toEqual({
      value: {
        raw: '1',
        normalized: 1,
      },
      unit: {
        raw: null,
        normalized: null,
      },
      ingredient: {
        raw: 'egg',
        normalized: 'egg',
      },
    });
  });
});
