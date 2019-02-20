import id from '../id';

describe('id generator', () => {
  test('filters bad chars', () => {
    expect(
      id("There's so (many) bad Chars!$234&&&8").includes(
        'theres-so-many-bad-chars',
      ),
    ).toBe(true);
  });
});
