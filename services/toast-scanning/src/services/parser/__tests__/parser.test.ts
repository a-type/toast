import parse from '../parser';

describe('food parser', () => {
  test('1 cup of oats', () => {
    expect(parse('1 cup of oats')).toEqual({
      original: '1 cup of oats',
      sanitized: '1 cup of oats',
      food: {
        raw: 'oats',
        normalized: 'oat',
        range: [9, 13],
      },
      unit: {
        raw: 'cup',
        normalized: 'cup',
        range: [2, 5],
      },
      quantity: {
        raw: '1',
        normalized: 1,
        range: [0, 1],
      },
      comments: [],
      preparations: [],
    });
  });

  test('1/3 tablespoon chopped onion', () => {
    expect(parse('1/3 tablespoon chopped onion')).toEqual({
      food: {
        raw: 'chopped onion',
        normalized: 'chopped onion',
        range: [15, 28],
      },
      unit: {
        raw: 'tablespoon',
        normalized: 'tablespoon',
        range: [4, 14],
      },
      quantity: {
        raw: '1/3',
        normalized: 0.333333333333333,
        range: [0, 3],
      },
      comments: [],
      preparations: [],
      original: '1/3 tablespoon chopped onion',
      sanitized: '1/3 tablespoon chopped onion',
    });
  });

  test('four slices of white bread', () => {
    expect(parse('four slices of white bread')).toEqual({
      food: {
        raw: 'white bread',
        normalized: 'white bread',
        range: [15, 26],
      },
      unit: {
        raw: 'slices',
        normalized: 'slice',
        range: [5, 11],
      },
      quantity: {
        raw: 'four',
        normalized: 4,
        range: [0, 4],
      },
      original: 'four slices of white bread',
      sanitized: 'four slices of white bread',
      comments: [],
      preparations: [],
    });
  });

  test('four', () => {
    expect(parse('four')).toEqual({
      quantity: {
        raw: 'four',
        normalized: 4,
        range: [0, 4],
      },
      unit: {
        raw: null,
        normalized: null,
        range: [],
      },
      food: {
        raw: null,
        normalized: null,
        range: [],
      },
      comments: [],
      preparations: [],
      original: 'four',
      sanitized: 'four',
    });
  });

  test('1 egg', () => {
    expect(parse('1 egg')).toEqual({
      quantity: {
        raw: '1',
        normalized: 1,
        range: [0, 1],
      },
      unit: {
        raw: null,
        normalized: null,
        range: [],
      },
      food: {
        raw: 'egg',
        normalized: 'egg',
        range: [2, 5],
      },
      comments: [],
      preparations: [],
      original: '1 egg',
      sanitized: '1 egg',
    });
  });

  test('2 eggs', () => {
    expect(parse('2 eggs')).toEqual({
      quantity: {
        raw: '2',
        normalized: 2,
        range: [0, 1],
      },
      unit: {
        raw: null,
        normalized: null,
        range: [],
      },
      food: {
        raw: 'eggs',
        normalized: 'egg',
        range: [2, 6],
      },
      comments: [],
      preparations: [],
      original: '2 eggs',
      sanitized: '2 eggs',
    });
  });

  test('3 tbsp flour', () => {
    expect(parse('3 tbsp flour')).toEqual({
      quantity: {
        raw: '3',
        normalized: 3,
        range: [0, 1],
      },
      unit: {
        raw: 'tbsp',
        normalized: 'tablespoon',
        range: [2, 6],
      },
      food: {
        raw: 'flour',
        normalized: 'flour',
        range: [7, 12],
      },
      comments: [],
      preparations: [],
      original: '3 tbsp flour',
      sanitized: '3 tbsp flour',
    });
  });

  test('1 slice of Bread', () => {
    expect(parse('1 slice of Bread')).toEqual({
      quantity: {
        raw: '1',
        normalized: 1,
        range: [0, 1],
      },
      unit: {
        raw: 'slice',
        normalized: 'slice',
        range: [2, 7],
      },
      food: {
        raw: 'Bread',
        normalized: 'bread',
        range: [11, 16],
      },
      comments: [],
      preparations: [],
      original: '1 slice of Bread',
      sanitized: '1 slice of Bread',
    });
  });

  test('2 tsp sesame or vegetable oil', () => {
    expect(parse('2 tsp sesame or vegetable oil')).toEqual({
      quantity: {
        raw: '2',
        normalized: 2,
        range: [0, 1],
      },
      unit: {
        raw: 'tsp',
        normalized: 'teaspoon',
        range: [2, 5],
      },
      food: {
        raw: 'sesame or vegetable oil',
        normalized: 'sesame or vegetable oil',
        range: [6, 29],
      },
      original: '2 tsp sesame or vegetable oil',
      sanitized: '2 tsp sesame or vegetable oil',
      preparations: [],
      comments: [],
    });
  });

  test('kosher salt, to season', () => {
    expect(parse('kosher salt, to season')).toEqual({
      quantity: {
        raw: null,
        normalized: null,
        range: [],
      },
      unit: {
        raw: null,
        normalized: null,
        range: [],
      },
      food: {
        raw: 'kosher salt',
        normalized: 'kosher salt',
        range: [0, 11],
      },
      comments: ['to season'],
      preparations: [],
      original: 'kosher salt, to season',
      sanitized: 'kosher salt, to season',
    });
  });

  test('1 (15 ounce) can kidney beans, drained and rinsed', () => {
    expect(parse('1 (15 ounce) can kidney beans, drained and rinsed')).toEqual({
      quantity: {
        raw: '1',
        normalized: 1,
        range: [0, 1],
      },
      unit: {
        raw: 'can',
        normalized: 'can',
        range: [13, 16],
      },
      food: {
        raw: 'kidney beans',
        normalized: 'kidney bean',
        range: [17, 29],
      },
      original: '1 (15 ounce) can kidney beans, drained and rinsed',
      comments: ['15 ounce'],
      sanitized: '1 (15 ounce) can kidney beans, drained and rinsed',
      preparations: ['drained and rinsed'],
    });
  });

  test('1 pound skinless, boneless chicken thighs, quartered', () => {
    expect(
      parse('1 pound skinless, boneless chicken thighs, quartered'),
    ).toEqual({
      quantity: {
        raw: '1',
        normalized: 1,
        range: [0, 1],
      },
      unit: {
        raw: 'pound',
        normalized: 'pound',
        range: [2, 7],
      },
      food: {
        raw: 'skinless, boneless chicken thighs',
        normalized: 'skinless, boneless chicken thigh',
        range: [8, 41],
      },
      original: '1 pound skinless, boneless chicken thighs, quartered',
      sanitized: '1 pound skinless, boneless chicken thighs, quartered',
      comments: [],
      preparations: ['quartered'],
    });
  });

  test('1 1/2 pounds (700 grams) large boneless and skinless chicken breasts halved horizontally to make 4 fillets (I use 2 large breasts -- 12 oz or 350 grams each)', () => {
    expect(
      parse(
        '1 1/2 pounds (700 grams) large boneless and skinless chicken breasts halved horizontally to make 4 fillets (I use 2 large breasts -- 12 oz or 350 grams each)',
      ),
    ).toEqual({
      original:
        '1 1/2 pounds (700 grams) large boneless and skinless chicken breasts halved horizontally to make 4 fillets (I use 2 large breasts -- 12 oz or 350 grams each)',
      sanitized:
        '1 1/2 pounds (700 grams) large boneless and skinless chicken breasts halved horizontally to make 4 fillets (I use 2 large breasts -- 12 oz or 350 grams each)',
      comments: [
        '700 grams',
        'I use 2 large breasts -- 12 oz or 350 grams each',
      ],
      preparations: [],
      food: {
        raw:
          'large boneless and skinless chicken breasts halved horizontally to make 4 fillets',
        normalized:
          'large boneless and skinless chicken breasts halved horizontally to make 4 fillet',
        range: [25, 106],
      },
      unit: {
        raw: 'pounds',
        normalized: 'pound',
        range: [6, 12],
      },
      quantity: {
        raw: '1 1/2',
        normalized: 1.5,
        range: [0, 5],
      },
    });
  });

  test('½ cup grated Parmesan cheese (plus additional for serving)', () => {
    expect(
      parse('½ cup grated Parmesan cheese (plus additional for serving)'),
    ).toEqual({
      original: '½ cup grated Parmesan cheese (plus additional for serving)',
      sanitized: '1/2 cup grated Parmesan cheese (plus additional for serving)',
      comments: ['plus additional for serving'],
      preparations: [],
      food: {
        raw: 'grated Parmesan cheese',
        normalized: 'grated parmesan cheese',
        range: [8, 30],
      },
      unit: {
        raw: 'cup',
        normalized: 'cup',
        range: [4, 7],
      },
      quantity: {
        raw: '1/2',
        normalized: 0.5,
        range: [0, 3],
      },
    });
  });
});
