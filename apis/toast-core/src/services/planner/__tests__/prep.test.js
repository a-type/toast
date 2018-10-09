import prep from '../prep';
import { variety, largeFamily, busy, nefarious, prePlanned } from './plans';

describe('prep meal plan', () => {
  test('for a variety plan', () => {
    expect(prep(variety)).toMatchInlineSnapshot(`
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
              "leftovers": false,
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
              "servings": 4,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
              "servings": 4,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
              "type": "EAT_OUT",
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
              "leftovers": false,
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
              "leftovers": false,
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
              "leftovers": true,
              "mealDay": 0,
              "mealIndex": 2,
              "type": "EAT",
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
              "leftovers": true,
              "mealDay": 1,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "NORMAL",
              "servings": 4,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
              "type": "EAT_OUT",
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
              "leftovers": false,
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
              "leftovers": false,
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
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
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
              "leftovers": false,
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
  "warnings": Array [],
}
`);
  });

  test('for a large family plan', () => {
    expect(prep(largeFamily)).toMatchInlineSnapshot(`
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
              "type": "EAT_OUT",
            },
          ],
          "availability": "EAT_OUT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "BIG",
              "servings": 12,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 0,
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
              "type": "EAT_OUT",
            },
          ],
          "availability": "LONG",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "QUICK",
              "servings": 6,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 1,
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
              "servings": 6,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 1,
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
          "availability": "SHORT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "QUICK",
              "servings": 6,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
              "servings": 6,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
              "leftovers": true,
              "mealDay": 0,
              "mealIndex": 2,
              "type": "EAT",
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
          "availability": "SHORT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "QUICK",
              "servings": 6,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 4,
              "mealIndex": 1,
              "type": "EAT",
            },
          ],
          "availability": "SHORT",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "BIG",
              "servings": 12,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 4,
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
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "BIG",
              "servings": 12,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 5,
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
              "type": "EAT_OUT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "leftovers": true,
              "mealDay": 5,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 6,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
  "servingsPerMeal": 6,
  "warnings": Array [],
}
`);
  });

  test('for a really busy person', () => {
    expect(prep(busy)).toMatchInlineSnapshot(`
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
              "leftovers": false,
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
              "mealType": "QUICK",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 0,
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
          "availability": "EAT_OUT",
        },
        Object {
          "actions": Array [
            Object {
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
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
          "availability": "SHORT",
        },
        Object {
          "actions": Array [
            Object {
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
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
              "leftovers": false,
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
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
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
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "BIG",
              "servings": 16,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
              "type": "EAT_OUT",
            },
          ],
          "availability": "LONG",
        },
        Object {
          "actions": Array [
            Object {
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
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
              "leftovers": false,
              "mealDay": 5,
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
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "leftovers": true,
              "mealDay": 4,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
      ],
    },
  ],
  "servingsPerMeal": 2,
  "warnings": Array [
    "You don't seem to have a lot of time to prep meals! You'll need to prep 7 meals in only 1 day. You can make your schedule more realistic by switching some meals to eating out.",
  ],
}
`);
  });

  test('a pre-planned plan', () => {
    expect(prep(prePlanned)).toMatchInlineSnapshot(`
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
              "leftovers": true,
              "mealDay": 6,
              "mealIndex": 1,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 4,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
              "leftovers": true,
              "mealDay": 0,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 4,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 1,
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
              "leftovers": true,
              "mealDay": 1,
              "mealIndex": 2,
              "type": "EAT",
            },
          ],
          "availability": "NONE",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 6,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 2,
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
              "mealType": "QUICK",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 3,
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
              "leftovers": true,
              "mealDay": 2,
              "mealIndex": 2,
              "type": "EAT",
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
              "leftovers": true,
              "mealDay": 2,
              "mealIndex": 2,
              "type": "EAT",
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
              "leftovers": false,
              "mealDay": 5,
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
          "availability": "MEDIUM",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "NORMAL",
              "servings": 4,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
              "mealDay": 6,
              "mealIndex": 1,
              "type": "EAT",
            },
          ],
          "availability": "MEDIUM",
        },
        Object {
          "actions": Array [
            Object {
              "mealType": "FANCY",
              "servings": 2,
              "type": "COOK",
            },
            Object {
              "leftovers": false,
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
  "id": "plan-4pKEMqa5Y",
  "servingsPerMeal": 2,
  "warnings": Array [],
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
