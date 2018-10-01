import prep from '../prep';
import { variety } from './plans';

describe('prep meal plan', () => {
  test('fills in days', () => {
    expect(prep(variety)).toMatchInlineSnapshot(`
Object {
  "days": Array [
    Object {
      "breakfast": Object {
        "availability": "NONE",
      },
      "dinner": Object {
        "availability": "LONG",
      },
      "lunch": Object {
        "availability": "SHORT",
      },
    },
    Object {
      "breakfast": Object {
        "availability": "NONE",
      },
      "dinner": Object {
        "availability": "MEDIUM",
      },
      "lunch": Object {
        "availability": "EAT_OUT",
      },
    },
    Object {
      "breakfast": Object {
        "availability": "SHORT",
      },
      "dinner": Object {
        "availability": "SHORT",
      },
      "lunch": Object {
        "availability": "SHORT",
      },
    },
    Object {
      "breakfast": Object {
        "availability": "NONE",
      },
      "dinner": Object {
        "availability": "EAT_OUT",
      },
      "lunch": Object {
        "availability": "NONE",
      },
    },
    Object {
      "breakfast": Object {
        "availability": "NONE",
      },
      "dinner": Object {
        "availability": "MEDIUM",
      },
      "lunch": Object {
        "availability": "NONE",
      },
    },
    Object {
      "breakfast": Object {
        "availability": "LONG",
      },
      "dinner": Object {
        "availability": "LONG",
      },
      "lunch": Object {
        "availability": "SHORT",
      },
    },
    Object {
      "breakfast": Object {
        "availability": "NONE",
      },
      "dinner": Object {
        "availability": "LONG",
      },
      "lunch": Object {
        "availability": "NONE",
      },
    },
  ],
  "servingsPerMeal": 2,
}
`);
  });
});
