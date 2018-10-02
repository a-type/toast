import basic from '../basic';
import { variety } from './plans';

describe('basic meal plan', () => {
  test('converts availability to meal types', () => {
    expect(basic(variety)).toMatchInlineSnapshot(`
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
            "servings": 2,
            "type": "COOK",
          },
          Object {
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
            "servings": 2,
            "type": "COOK",
          },
          Object {
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
            "mealType": "QUICK",
            "servings": 2,
            "type": "COOK",
          },
          Object {
            "mealId": "2.breakfast",
            "type": "EAT",
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
            "type": "EAT_OUT",
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
            "servings": 2,
            "type": "COOK",
          },
          Object {
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
            "type": "EAT_OUT",
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
            "mealType": "FANCY",
            "servings": 2,
            "type": "COOK",
          },
          Object {
            "mealId": "5.breakfast",
            "type": "EAT",
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
            "type": "EAT_OUT",
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
