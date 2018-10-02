import prep from '../prep';
import { variety } from './plans';

describe('prep meal plan', () => {
  test('fills in days', () => {
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
            "mealType": "NORMAL",
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
            "mealType": "QUICK",
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
            "mealType": "QUICK",
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
});
