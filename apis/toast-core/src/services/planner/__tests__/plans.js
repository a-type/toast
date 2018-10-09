export const variety = {
  servingsPerMeal: 2,
  days: [
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'SHORT',
        },
        {
          availability: 'LONG',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'EAT_OUT',
        },
        {
          availability: 'MEDIUM',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'SHORT',
        },
        {
          availability: 'SHORT',
        },
        {
          availability: 'SHORT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'EAT_OUT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'MEDIUM',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'LONG',
        },
        {
          availability: 'SHORT',
        },
        {
          availability: 'LONG',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'LONG',
        },
      ],
    },
  ],
};

export const busy = {
  servingsPerMeal: 2,
  days: [
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'SHORT',
        },
        {
          availability: 'SHORT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'EAT_OUT',
        },
        {
          availability: 'NONE',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'SHORT',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'SHORT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'EAT_OUT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'MEDIUM',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'LONG',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'SHORT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
      ],
    },
  ],
};

export const largeFamily = {
  servingsPerMeal: 6,
  days: [
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'EAT_OUT',
        },
        {
          availability: 'MEDIUM',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'LONG',
        },
        {
          availability: 'SHORT',
        },
        {
          availability: 'LONG',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'SHORT',
        },
        {
          availability: 'SHORT',
        },
        {
          availability: 'SHORT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'EAT_OUT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'SHORT',
        },
        {
          availability: 'SHORT',
        },
        {
          availability: 'LONG',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'MEDIUM',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'NONE',
        },
        {
          availability: 'NONE',
        },
        {
          availability: 'LONG',
        },
      ],
    },
  ],
};

export const prePlanned = {
  servingsPerMeal: 2,
  days: [
    {
      meals: [
        { availability: 'NONE', actions: [{ type: 'EAT_OUT' }] },
        { actions: [{ type: 'EAT_OUT' }], availability: 'NONE' },
        {
          actions: [
            { mealType: 'FANCY', type: 'COOK', servings: 2 },
            { mealDay: 0, type: 'EAT', mealIndex: 2 },
          ],
          availability: 'LONG',
        },
      ],
    },
    {
      meals: [
        { availability: 'NONE', actions: [{ type: 'EAT_OUT' }] },
        { availability: 'NONE', actions: [{ type: 'EAT_OUT' }] },
        {
          availability: 'LONG',
          actions: [
            { servings: 2, mealType: 'FANCY', type: 'COOK' },
            { mealIndex: 2, mealDay: 1, type: 'EAT' },
          ],
        },
      ],
    },
    {
      meals: [
        { actions: [{ type: 'EAT_OUT' }], availability: 'NONE' },
        { actions: [{ type: 'EAT_OUT' }], availability: 'NONE' },
        {
          actions: [
            { servings: 2, mealType: 'FANCY', type: 'COOK' },
            { mealIndex: 2, mealDay: 2, type: 'EAT' },
          ],
          availability: 'LONG',
        },
      ],
    },
    {
      meals: [
        { availability: 'NONE', actions: [{ type: 'EAT_OUT' }] },
        { availability: 'EAT_OUT', actions: [{ type: 'EAT_OUT' }] },
        {
          availability: 'SHORT',
          actions: [
            { type: 'COOK', servings: 2, mealType: 'QUICK' },
            { type: 'EAT', mealIndex: 2, mealDay: 3 },
          ],
        },
      ],
    },
    {
      meals: [
        { availability: 'NONE', actions: [{ type: 'EAT_OUT' }] },
        { availability: 'NONE', actions: [{ type: 'EAT_OUT' }] },
        { availability: 'EAT_OUT', actions: [{ type: 'EAT_OUT' }] },
      ],
    },
    {
      meals: [
        { actions: [{ type: 'EAT_OUT' }], availability: 'NONE' },
        { availability: 'NONE', actions: [{ type: 'EAT_OUT' }] },
        {
          actions: [
            { mealType: 'QUICK', type: 'COOK', servings: 2 },
            { mealIndex: 2, mealDay: 5, type: 'EAT' },
          ],
          availability: 'SHORT',
        },
      ],
    },
    {
      meals: [
        {
          availability: 'MEDIUM',
          actions: [
            { mealType: 'NORMAL', type: 'COOK', servings: 2 },
            { mealDay: 6, type: 'EAT', mealIndex: 0 },
          ],
        },
        {
          availability: 'MEDIUM',
          actions: [
            { mealType: 'NORMAL', type: 'COOK', servings: 2 },
            { mealDay: 6, type: 'EAT', mealIndex: 1 },
          ],
        },
        {
          availability: 'LONG',
          actions: [
            { mealType: 'FANCY', type: 'COOK', servings: 2 },
            { mealDay: 6, type: 'EAT', mealIndex: 2 },
          ],
        },
      ],
    },
  ],
  id: 'plan-4pKEMqa5Y',
  warnings: [],
};

export const nefarious = {
  noTime: {
    servingsPerMeal: 2,
    days: [
      {
        meals: [
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
          {
            availability: 'NONE',
          },
        ],
      },
    ],
  },
  eatOut: {
    servingsPerMeal: 2,
    days: [
      {
        meals: [
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
        ],
      },
      {
        meals: [
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
          {
            availability: 'EAT_OUT',
          },
        ],
      },
    ],
  },
};
