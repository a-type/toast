export const getColor = value => {
  switch (value) {
    case 'EAT_OUT':
      return 'var(--color-gray-light)';
    case 'NONE':
      return 'var(--color-negative-light)';
    case 'SHORT':
      return 'var(--color-brand-light)';
    case 'MEDIUM':
      return 'var(--color-brand-light)';
    case 'LONG':
      return 'var(--color-positive-light)';
    case 'SKIP':
      return 'var(--color-gray-lightest)';
    default:
      return 'var(--color-gray-lightest)';
  }
};

export const getForeground = value => {
  switch (value) {
    case 'EAT_OUT':
      return 'var(--color-dark)';
    case 'NONE':
      return 'var(--color-negative-dark)';
    case 'SHORT':
      return 'var(--color-brand-dark)';
    case 'MEDIUM':
      return 'var(--color-brand-dark)';
    case 'LONG':
      return 'var(--color-positive-dark)';
    case 'SKIP':
      return 'var(--color-dark)';
    default:
      return 'var(--color-dark)';
  }
};

export const getLabel = value => {
  switch (value) {
    case 'EAT_OUT':
      return 'Eat out';
    case 'NONE':
      return 'No time';
    case 'SHORT':
      return '< 1 hour';
    case 'MEDIUM':
      return '1 hour +';
    case 'LONG':
      return '2 hours +';
    case 'SKIP':
      return 'Skip';
    default:
      return 'Choose one';
  }
};

export const getIcon = value => {
  switch (value) {
    case 'EAT_OUT':
      return 'waiter';
    case 'NONE':
      return 'sand-timer';
    case 'SHORT':
      return 'run';
    case 'MEDIUM':
      return 'walk';
    case 'LONG':
      return 'beach';
    case 'SKIP':
      return 'skip-this-track';
  }
};
