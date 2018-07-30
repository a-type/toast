import parseIngredient from '../index';

describe('ingredient units parser', () => {
  test('covers some use cases', () => {
    [
      ['3 cups', { unit: 'cup', number: 3, leftovers: '' }],
      ['1/2 tbsp', { unit: 'tablespoon', number: 0.5, leftovers: '' }],
      ['ten g', { unit: 'gram', number: 10, leftovers: '' }],
      ['3 / 8 cup water', { unit: 'cup', number: 3 / 8.0, leftovers: 'water' }],
      ['8 asdfasdf', { unit: null, number: 8, leftovers: 'asdfasdf' }],
      [
        '0.25 tsp sugar',
        { unit: 'teaspoon', number: 0.25, leftovers: 'sugar' },
      ],
    ].forEach(([input, expected]) => {
      expect(parseIngredient(input)).toEqual(expected);
    });
  });
});
