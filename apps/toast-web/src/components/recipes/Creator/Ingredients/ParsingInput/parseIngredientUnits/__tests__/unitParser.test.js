import unitParser from '../unitParser';

describe('the unit parser for ingredient parsing', () => {
  test('covers some use cases', () => {
    [
      ['cup of corn', { unit: 'cup', remainingText: 'corn' }],
      ['ears of corn', { unit: 'ear', remainingText: 'corn' }],
      ['cup olive oil', { unit: 'cup', remainingText: 'olive oil' }],
      ['pinch of salt', { unit: 'pinch', remainingText: 'salt' }],
      ['lbs beef', { unit: 'pound', remainingText: 'beef' }],
      [
        'ml rice wine vinegar',
        { unit: 'milliliter', remainingText: 'rice wine vinegar' },
      ],
      ['l water', { unit: 'liter', remainingText: 'water' }],
      ['cup', { unit: 'cup', remainingText: '' }],
      ['g', { unit: 'gram', remainingText: '' }],
    ].forEach(([input, expected]) => {
      expect(unitParser(input)).toEqual(expected);
    });
  });
});
