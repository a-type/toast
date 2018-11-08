import Plan, {
  PlanActionType,
  PlanActionCook,
  PlanActionEat,
  PlanActionEatOut,
  PlanActionReadyMade,
  PlanActionSkip,
} from 'models/Plan';

export default () => {
  const mockId = () => {
    let mockCounter = 0;
    return idPrefix => `${idPrefix}_MOCK_ID_${mockCounter++}`;
  };
  const options = () => ({ generateId: mockId() });

  const variety = new Plan(
    {
      defaultServings: 2,
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
    },
    options(),
  );

  const basicPlanned = new Plan(
    {
      id: 'plan-4pKEMqa5Y',
      days: [
        {
          meals: [
            {
              availability: 'SHORT',
              actions: [
                {
                  id: '1',
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'QUICK',
                } as PlanActionCook,
                {
                  id: '2',
                  type: PlanActionType.Eat,
                  leftovers: false,
                } as PlanActionEat,
              ],
            },
            {
              availability: 'MEDIUM',
              actions: [
                {
                  id: '3',
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'NORMAL',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '4',
                } as PlanActionEat,
              ],
            },
            {
              availability: 'LONG',
              actions: [
                {
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'FANCY',
                  id: '5',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '6',
                } as PlanActionEat,
              ],
            },
          ],
        },
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '7' } as PlanActionSkip,
              ],
            },
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '8' } as PlanActionSkip,
              ],
            },
            {
              availability: 'LONG',
              actions: [
                {
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'FANCY',
                  id: '9',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '10',
                } as PlanActionEat,
              ],
            },
          ],
        },
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '11' } as PlanActionSkip,
              ],
            },
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '12' } as PlanActionSkip,
              ],
            },
            {
              availability: 'LONG',
              actions: [
                {
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'FANCY',
                  id: '13',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '14',
                } as PlanActionEat,
              ],
            },
          ],
        },
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '15' } as PlanActionSkip,
              ],
            },
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '16' } as PlanActionSkip,
              ],
            },
            {
              availability: 'MEDIUM',
              actions: [
                {
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'NORMAL',
                  id: '17',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '18',
                } as PlanActionEat,
              ],
            },
          ],
        },
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '19' } as PlanActionSkip,
              ],
            },
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '20' } as PlanActionSkip,
              ],
            },
            {
              availability: 'SHORT',
              actions: [
                {
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'QUICK',
                  id: '21',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '22',
                } as PlanActionEat,
              ],
            },
          ],
        },
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '23' } as PlanActionSkip,
              ],
            },
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.Skip, id: '24' } as PlanActionSkip,
              ],
            },
            {
              availability: 'SHORT',
              actions: [
                {
                  id: '25',
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'QUICK',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '26',
                } as PlanActionEat,
              ],
            },
          ],
        },
        {
          meals: [
            {
              availability: 'LONG',
              actions: [
                {
                  id: '27',
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'FANCY',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '28',
                } as PlanActionEat,
              ],
            },
            {
              availability: 'MEDIUM',
              actions: [
                {
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'NORMAL',
                  id: '29',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '30',
                } as PlanActionEat,
              ],
            },
            {
              availability: 'LONG',
              actions: [
                {
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'FANCY',
                  id: '31',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  leftovers: false,
                  id: '32',
                } as PlanActionEat,
              ],
            },
          ],
        },
      ],
      warnings: [],
    },
    options(),
  );

  const busy = new Plan(
    {
      defaultServings: 2,
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
    },
    options(),
  );

  const largeFamily = new Plan(
    {
      defaultServings: 6,
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
    },
    options(),
  );

  const prePlanned = new Plan(
    {
      defaultServings: 2,
      days: [
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.EatOut, id: '1' } as PlanActionEatOut,
              ],
            },
            {
              actions: [
                { type: PlanActionType.EatOut, id: '2' } as PlanActionEatOut,
              ],
              availability: 'NONE',
            },
            {
              actions: [
                {
                  mealType: 'FANCY',
                  type: PlanActionType.Cook,
                  servings: 2,
                  id: '3',
                } as PlanActionCook,
                {
                  cookActionId: '3',
                  type: PlanActionType.Eat,
                  id: '4',
                } as PlanActionEat,
              ],
              availability: 'LONG',
            },
          ],
        },
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.EatOut, id: '5' } as PlanActionEatOut,
              ],
            },
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.EatOut, id: '6' } as PlanActionEatOut,
              ],
            },
            {
              availability: 'LONG',
              actions: [
                {
                  servings: 2,
                  mealType: 'FANCY',
                  type: PlanActionType.Cook,
                  id: '7',
                } as PlanActionCook,
                {
                  cookActionId: '7',
                  type: PlanActionType.Eat,
                  id: '8',
                } as PlanActionEat,
              ],
            },
          ],
        },
        {
          meals: [
            {
              actions: [
                { type: PlanActionType.EatOut, id: '9' } as PlanActionEatOut,
              ],
              availability: 'NONE',
            },
            {
              actions: [
                { type: PlanActionType.EatOut, id: '10' } as PlanActionEatOut,
              ],
              availability: 'NONE',
            },
            {
              actions: [
                {
                  servings: 2,
                  mealType: 'FANCY',
                  type: PlanActionType.Cook,
                  id: '11',
                } as PlanActionCook,
                {
                  cookActionId: '11',
                  type: PlanActionType.Eat,
                  id: '12',
                } as PlanActionEat,
              ],
              availability: 'LONG',
            },
          ],
        },
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.EatOut, id: '13' } as PlanActionEatOut,
              ],
            },
            {
              availability: 'EAT_OUT',
              actions: [
                { type: PlanActionType.EatOut, id: '14' } as PlanActionEatOut,
              ],
            },
            {
              availability: 'SHORT',
              actions: [
                {
                  type: PlanActionType.Cook,
                  servings: 2,
                  mealType: 'QUICK',
                  id: '15',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  id: '16',
                  cookActionId: '15',
                } as PlanActionEat,
              ],
            },
          ],
        },
        {
          meals: [
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.EatOut, id: '16' } as PlanActionEatOut,
              ],
            },
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.EatOut, id: '17' } as PlanActionEatOut,
              ],
            },
            {
              availability: 'EAT_OUT',
              actions: [
                { type: PlanActionType.EatOut, id: '18' } as PlanActionEatOut,
              ],
            },
          ],
        },
        {
          meals: [
            {
              actions: [
                { type: PlanActionType.EatOut, id: '19' } as PlanActionEatOut,
              ],
              availability: 'NONE',
            },
            {
              availability: 'NONE',
              actions: [
                { type: PlanActionType.EatOut, id: '20' } as PlanActionEatOut,
              ],
            },
            {
              actions: [
                {
                  mealType: 'QUICK',
                  type: PlanActionType.Cook,
                  servings: 2,
                  id: '21',
                } as PlanActionCook,
                {
                  cookActionId: '21',
                  type: PlanActionType.Eat,
                  id: '22',
                } as PlanActionEat,
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
                {
                  mealType: 'NORMAL',
                  type: PlanActionType.Cook,
                  servings: 2,
                  id: '23',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  id: '24',
                  cookActionId: '23',
                } as PlanActionEat,
              ],
            },
            {
              availability: 'MEDIUM',
              actions: [
                {
                  mealType: 'NORMAL',
                  type: PlanActionType.Cook,
                  servings: 2,
                  id: '25',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  cookActionId: '25',
                  id: '26',
                } as PlanActionEat,
              ],
            },
            {
              availability: 'LONG',
              actions: [
                {
                  mealType: 'FANCY',
                  type: PlanActionType.Cook,
                  servings: 2,
                  id: '27',
                } as PlanActionCook,
                {
                  type: PlanActionType.Eat,
                  cookActionId: '27',
                  id: '28',
                } as PlanActionEat,
              ],
            },
          ],
        },
      ],
      id: 'plan-4pKEMqa5Y',
      warnings: [],
    },
    options(),
  );

  const nefarious = {
    noTime: new Plan(
      {
        defaultServings: 2,
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
      options(),
    ),
    eatOut: new Plan(
      {
        defaultServings: 2,
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
      options(),
    ),
  };

  return {
    variety,
    busy,
    largeFamily,
    prePlanned,
    nefarious,
    basicPlanned,
  };
};
