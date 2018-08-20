import parse from '../index';

describe('ingredient parser', () => {
  test('1 cup of oats', () => {
    expect(parse('1 cup of oats')).toEqual({
      ingredient: {
        raw: 'oats',
        normalized: 'oat'
      },
      unit: {
        raw: 'cup',
        normalized: 'cup'
      },
      value: {
        raw: '1',
        normalized: 1
      },
      optional: false
    });
  });

  test('1/3 tablespoon chopped onion', () => {
    expect(parse('1/3 tablespoon chopped onion')).toEqual({
      ingredient: {
        raw: 'chopped onion',
        normalized: 'chopped onion'
      },
      unit: {
        raw: 'tablespoon',
        normalized: 'tablespoon'
      },
      value: {
        raw: '1/3',
        normalized: 1 / 3.0
      },
      optional: false
    });
  });

  test('four slices of white bread', () => {
    expect(parse('four slices of white bread')).toEqual({
      ingredient: {
        raw: 'white bread',
        normalized: 'white bread'
      },
      unit: {
        raw: 'slices',
        normalized: 'slice'
      },
      value: {
        raw: 'four',
        normalized: 4
      },
      optional: false
    });
  });

  test('four', () => {
    expect(parse('four')).toEqual({
      value: {
        raw: 'four',
        normalized: 4
      },
      unit: {
        raw: null,
        normalized: null
      },
      ingredient: {
        raw: null,
        normalized: null
      },
      optional: false
    });
  });

  test('1 egg', () => {
    expect(parse('1 egg')).toEqual({
      value: {
        raw: '1',
        normalized: 1
      },
      unit: {
        raw: null,
        normalized: null
      },
      ingredient: {
        raw: 'egg',
        normalized: 'egg'
      },
      optional: false
    });
  });

  test('2 eggs', () => {
    expect(parse('2 eggs')).toEqual({
      value: {
        raw: '2',
        normalized: 2
      },
      unit: {
        raw: null,
        normalized: null
      },
      ingredient: {
        raw: 'eggs',
        normalized: 'egg'
      },
      optional: false
    });
  });

  test('3 tbsp flour', () => {
    expect(parse('3 tbsp flour')).toEqual({
      value: {
        raw: '3',
        normalized: 3
      },
      unit: {
        raw: 'tbsp',
        normalized: 'tablespoon'
      },
      ingredient: {
        raw: 'flour',
        normalized: 'flour'
      },
      optional: false
    });
  });

  test('1 slice of Bread', () => {
    expect(parse('1 slice of Bread')).toEqual({
      value: {
        raw: '1',
        normalized: 1
      },
      unit: {
        raw: 'slice',
        normalized: 'slice'
      },
      ingredient: {
        raw: 'Bread',
        normalized: 'bread'
      },
      optional: false
    });
  });

  test('2 tsp sesame or vegetable oil', () => {
    expect(parse('2 tsp sesame or vegetable oil')).toEqual({
      value: {
        raw: '2',
        normalized: 2
      },
      unit: {
        raw: 'tsp',
        normalized: 'teaspoon'
      },
      ingredient: {
        raw: 'sesame or vegetable oil',
        normalized: 'sesame or vegetable oil'
      },
      optional: false
    });
  });

  test('kosher salt, to season', () => {
    expect(parse('kosher salt, to season')).toEqual({
      value: {
        raw: null,
        normalized: null
      },
      unit: {
        raw: null,
        normalized: null
      },
      ingredient: {
        raw: 'kosher salt',
        normalized: 'kosher salt'
      },
      optional: false
    });
  });
});
