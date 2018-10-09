import basic from '../basic';
import { variety } from './plans';

describe('basic meal plan', () => {
  test('converts availability to meal types', () => {
    expect(basic(variety)).toMatchInlineSnapshot(`
Object {
  "days": Array [
    Object {
      "meals": Array [
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "QUICK",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 0,
              "mealIndex": 1,
              "type": "EAT",
            },
          ],
          "availability": "SHORT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 0,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "LONG",
        },
      ],
    },
    Object {
      "meals": Array [
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "EAT_OUT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "NORMAL",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 1,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "MEDIUM",
        },
      ],
    },
    Object {
      "meals": Array [
        Object {
          "actions": Array [
            Object {
              "mealType": "QUICK",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 2,
              "mealIndex": 0,
              "type": "EAT",
            },
          ],
          "availability": "SHORT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "QUICK",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 2,
              "mealIndex": 1,
              "type": "EAT",
            },
          ],
          "availability": "SHORT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "QUICK",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 2,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "SHORT",
        },
      ],
    },
    Object {
      "meals": Array [
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "EAT_OUT",
        },
      ],
    },
    Object {
      "meals": Array [
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "NORMAL",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "MEDIUM",
        },
      ],
    },
    Object {
      "meals": Array [
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 5,
              "mealIndex": 0,
              "type": "EAT",
            },
          ],
          "availability": "LONG",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "QUICK",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 5,
              "mealIndex": 1,
              "type": "EAT",
            },
          ],
          "availability": "SHORT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 5,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "LONG",
        },
      ],
    },
    Object {
      "meals": Array [
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "mealDay": 6,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "LONG",
        },
      ],
    },
  ],
  "servingsPerMeal": 2,
}
`);
  });
});
