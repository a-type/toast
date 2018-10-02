import prep from '../prep';
import { variety, largeFamily, nefarious } from './plans';

describe('prep meal plan', () => {
  test('for a variety plan', () => {
    expect(prep(variety)).toMatchInlineSnapshot(`
Object {
  "days": Array [
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "FANCY",
            "servings": 4,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "0.dinner",
            "type": "EAT",
          },
        ],
        "availability": "LONG",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "mealType": "QUICK",
            "servings": 2,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "0.lunch",
            "type": "EAT",
          },
        ],
        "availability": "SHORT",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "NORMAL",
            "servings": 4,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "1.dinner",
            "type": "EAT",
          },
        ],
        "availability": "MEDIUM",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "EAT_OUT",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "SHORT",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "QUICK",
            "servings": 2,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "2.dinner",
            "type": "EAT",
          },
        ],
        "availability": "SHORT",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "mealType": "QUICK",
            "servings": 2,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "2.lunch",
            "type": "EAT",
          },
        ],
        "availability": "SHORT",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "EAT_OUT",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "leftovers": true,
            "mealId": "0.dinner",
            "type": "EAT",
          },
        ],
        "availability": "NONE",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "NORMAL",
            "servings": 4,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "4.dinner",
            "type": "EAT",
          },
        ],
        "availability": "MEDIUM",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "leftovers": true,
            "mealId": "1.dinner",
            "type": "EAT",
          },
        ],
        "availability": "NONE",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "LONG",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "FANCY",
            "servings": 2,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "5.dinner",
            "type": "EAT",
          },
        ],
        "availability": "LONG",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "mealType": "QUICK",
            "servings": 2,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "5.lunch",
            "type": "EAT",
          },
        ],
        "availability": "SHORT",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "FANCY",
            "servings": 2,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "6.dinner",
            "type": "EAT",
          },
        ],
        "availability": "LONG",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "leftovers": true,
            "mealId": "4.dinner",
            "type": "EAT",
          },
        ],
        "availability": "NONE",
        "meal": "lunch",
      },
    },
  ],
  "servingsPerMeal": 2,
}
`);
  });

  test('for a large family plan', () => {
    expect(prep(largeFamily)).toMatchInlineSnapshot(`
Object {
  "days": Array [
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "BIG",
            "servings": 12,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "0.dinner",
            "type": "EAT",
          },
        ],
        "availability": "MEDIUM",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "EAT_OUT",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "LONG",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "FANCY",
            "servings": 6,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "1.dinner",
            "type": "EAT",
          },
        ],
        "availability": "LONG",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "mealType": "QUICK",
            "servings": 6,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "1.lunch",
            "type": "EAT",
          },
        ],
        "availability": "SHORT",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "SHORT",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "QUICK",
            "servings": 6,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "2.dinner",
            "type": "EAT",
          },
        ],
        "availability": "SHORT",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "mealType": "QUICK",
            "servings": 6,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "2.lunch",
            "type": "EAT",
          },
        ],
        "availability": "SHORT",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "EAT_OUT",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "leftovers": true,
            "mealId": "0.dinner",
            "type": "EAT",
          },
        ],
        "availability": "NONE",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "SHORT",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "BIG",
            "servings": 12,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "4.dinner",
            "type": "EAT",
          },
        ],
        "availability": "LONG",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "mealType": "QUICK",
            "servings": 6,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "4.lunch",
            "type": "EAT",
          },
        ],
        "availability": "SHORT",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "BIG",
            "servings": 12,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "5.dinner",
            "type": "EAT",
          },
        ],
        "availability": "MEDIUM",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "leftovers": true,
            "mealId": "4.dinner",
            "type": "EAT",
          },
        ],
        "availability": "NONE",
        "meal": "lunch",
      },
    },
    Object {
      "breakfast": Object {
        "actions": Array [
          Object {
            "type": "EAT_OUT",
          },
        ],
        "availability": "NONE",
        "meal": "breakfast",
      },
      "dinner": Object {
        "actions": Array [
          Object {
            "mealType": "FANCY",
            "servings": 6,
            "type": "COOK",
          },
          Object {
            "leftovers": false,
            "mealId": "6.dinner",
            "type": "EAT",
          },
        ],
        "availability": "LONG",
        "meal": "dinner",
      },
      "lunch": Object {
        "actions": Array [
          Object {
            "leftovers": true,
            "mealId": "5.dinner",
            "type": "EAT",
          },
        ],
        "availability": "NONE",
        "meal": "lunch",
      },
    },
  ],
  "servingsPerMeal": 6,
}
`);
  });

  describe('nefarious cases', () => {
    test('no time', () => {
      expect(() => prep(nefarious.noTime)).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, but you don't seem to have enough free time to prepare meals! You need at least one day with an hour or so"`,
      );
    });

    test('eating out all the time', () => {
      expect(() => prep(nefarious.eatOut)).toThrowErrorMatchingInlineSnapshot(
        `"Sorry, but you don't seem to have enough free time to prepare meals! You need at least one day with an hour or so"`,
      );
    });
  });
});
