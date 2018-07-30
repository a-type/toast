import numberParser from '../numberParser';

describe('number parser for ingredient parsing', () => {
  test('covers some use cases', () => {
    [
      ['1 cup of corn', { number: 1, remainingText: 'cup of corn' }],
      ['three ears of corn', { number: 3, remainingText: 'ears of corn' }],
      ['Three ears of corn', { number: 3, remainingText: 'ears of corn' }],
      ['1/4 cup olive oil', { number: 0.25, remainingText: 'cup olive oil' }],
      [
        '3 / 8 tablespoon olive oil',
        { number: 3 / 8.0, remainingText: 'tablespoon olive oil' },
      ],
      [
        'three fourths cup of milk',
        { number: 0.75, remainingText: 'cup of milk' },
      ],
      [
        'Three fourths cup of milk',
        { number: 0.75, remainingText: 'cup of milk' },
      ],
      ['a pinch of salt', { number: 1, remainingText: 'pinch of salt' }],
      ['eighteen', { number: 18, remainingText: '' }],
      ['1', { number: 1, remainingText: '' }],
      ['0.5 g cinnamon', { number: 0.5, remainingText: 'g cinnamon' }],
      ['bbbbb', { number: null, remainingText: 'bbbbb' }],
    ].forEach(([input, expected]) => {
      expect(numberParser(input)).toEqual(expected);
    });
  });
});
