import Schedule from 'models/Schedule';

export default () => {
  const mockId = () => {
    let mockCounter = 0;
    return idPrefix => `${idPrefix}_MOCK_ID_${mockCounter++}`;
  };
  const options = () => ({ generateId: mockId() });

  const fromAvailability = (availability: string[]) => {
    if (availability.length !== 21) {
      throw new Error('Test data length incorrect ' + availability.length);
    }
    const base = new Schedule(undefined, options());
    return availability.reduce<Schedule>(
      (plan: Schedule, av: string, idx: number) => {
        plan.meals[idx].availability = av;
        return plan;
      },
      base,
    );
  };

  const variety = fromAvailability([
    'NONE',
    'SHORT',
    'LONG',

    'NONE',
    'EAT_OUT',
    'MEDIUM',

    'SHORT',
    'SHORT',
    'SHORT',

    'NONE',
    'NONE',
    'EAT_OUT',

    'NONE',
    'NONE',
    'MEDIUM',

    'LONG',
    'SHORT',
    'LONG',

    'NONE',
    'NONE',
    'LONG',
  ]);
  variety.defaultServings = 2;

  const basic = fromAvailability([
    'SHORT',
    'MEDIUM',
    'LONG',

    'NONE',
    'NONE',
    'LONG',

    'NONE',
    'NONE',
    'LONG',

    'NONE',
    'NONE',
    'MEDIUM',

    'NONE',
    'NONE',
    'SHORT',

    'NONE',
    'NONE',
    'SHORT',

    'LONG',
    'MEDIUM',
    'LONG',
  ]);
  basic.defaultServings = 2;

  const busy = fromAvailability([
    'NONE',
    'SHORT',
    'SHORT',

    'NONE',
    'EAT_OUT',
    'NONE',

    'SHORT',
    'NONE',
    'SHORT',

    'NONE',
    'NONE',
    'EAT_OUT',

    'NONE',
    'NONE',
    'MEDIUM',

    'LONG',
    'NONE',
    'SHORT',

    'NONE',
    'NONE',
    'NONE',
  ]);
  busy.defaultServings = 2;

  const largeFamily = fromAvailability([
    'NONE',
    'EAT_OUT',
    'MEDIUM',

    'LONG',
    'SHORT',
    'LONG',

    'SHORT',
    'SHORT',
    'SHORT',

    'NONE',
    'NONE',
    'EAT_OUT',

    'SHORT',
    'SHORT',
    'LONG',

    'NONE',
    'NONE',
    'MEDIUM',

    'NONE',
    'NONE',
    'LONG',
  ]);
  largeFamily.defaultServings = 6;

  const weekSpanning = fromAvailability([
    'NONE',
    'NONE',
    'NONE',

    'NONE',
    'MEDIUM',
    'LONG',

    'SHORT',
    'SHORT',
    'LONG',

    'NONE',
    'SHORT',
    'MEDIUM',

    'EAT_OUT',
    'EAT_OUT',
    'LONG',

    'NONE',
    'EAT_OUT',
    'SHORT',

    'NONE',
    'SHORT',
    'LONG',
  ]);

  const nefarious = {
    noTime: fromAvailability(new Array(21).fill('NONE')),
    eatOut: fromAvailability(new Array(21).fill('EAT_OUT')),
  };

  return {
    variety,
    busy,
    largeFamily,
    nefarious,
    basic,
    weekSpanning,
  };
};
