import * as quantities from '../quantities';

describe('quantity tools', () => {
  describe('adding quantities', () => {
    test('same unit', () => {
      expect(
        quantities.addQuantities(
          {
            value: 0.5,
            unit: 'cup',
          },
          {
            value: 1,
            unit: 'cup',
          },
        ),
      ).toEqual({
        value: 1.5,
        unit: 'cup',
      });
    });

    test('named unit', () => {
      expect(
        quantities.addQuantities(
          {
            value: 1,
            unit: 'pound',
          },
          {
            value: 8,
            unit: 'ounce',
          },
        ),
      ).toEqual({
        value: 1.5,
        unit: 'lb',
      });
    });

    test('compatible units', () => {
      expect(
        quantities.addQuantities(
          {
            value: 0.5,
            unit: 'cup',
          },
          {
            value: 3,
            unit: 'tablespoon',
          },
        ),
      ).toEqual({
        value: 0.6875,
        unit: 'cup',
      });
    });

    test('no units', () => {
      expect(
        quantities.addQuantities(
          {
            value: 3,
            unit: undefined,
          },
          {
            value: 2,
            unit: undefined,
          },
        ),
      ).toEqual({
        value: 5,
        unit: undefined,
      });
    });

    test('unknown units (same)', () => {
      expect(
        quantities.addQuantities(
          {
            value: 3,
            unit: 'slice',
          },
          {
            value: 2,
            unit: 'slice',
          },
        ),
      ).toEqual({
        value: 5,
        unit: 'slice',
      });
    });

    test('incompatible units', () => {
      expect(() =>
        quantities.addQuantities(
          {
            value: 4,
            unit: 'cup',
          },
          {
            value: 2,
            unit: 'lb',
          },
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Quantities are not compatible 4 cup, 2 lb"`,
      );
    });

    test('unknown unit and known unit', () => {
      expect(() =>
        quantities.addQuantities(
          {
            value: 4,
            unit: 'cup',
          },
          {
            value: 2,
            unit: 'foo',
          },
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Quantities are not compatible 4 cup, 2 foo"`,
      );
    });

    test('known unit and unknown unit', () => {
      expect(() =>
        quantities.addQuantities(
          {
            value: 4,
            unit: 'foo',
          },
          {
            value: 2,
            unit: 'cup',
          },
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Quantities are not compatible 4 foo, 2 cup"`,
      );
    });

    test('different unknown units', () => {
      expect(() =>
        quantities.addQuantities(
          {
            value: 3,
            unit: 'slice',
          },
          {
            value: 4,
            unit: 'baz',
          },
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Two unknown quantities were added which may not be compatible 3 slice, 4 baz"`,
      );
    });
  });
});
