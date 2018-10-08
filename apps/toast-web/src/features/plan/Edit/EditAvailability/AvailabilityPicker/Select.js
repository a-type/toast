import React from 'react';
import Select from 'react-select';
import { withProps } from 'recompose';
import { Icon } from 'components/generic';
import { focusShadow } from 'components/effects';
import { pathOr } from 'ramda';

export const getColor = value => {
  switch (value) {
    case 'EAT_OUT':
      return 'var(--color-gray-dark)';
    case 'NONE':
      return 'var(--color-negative-light)';
    case 'SHORT':
      return 'var(--color-brand-light)';
    case 'MEDIUM':
      return 'var(--color-brand-light)';
    case 'LONG':
      return 'var(--color-positive-light)';
    case 'SKIP':
      return 'var(--color-gray)';
    default:
      return 'var(--color-gray-lightest)';
  }
};

export const getForeground = value => {
  switch (value) {
    case 'EAT_OUT':
      return 'var(--color-white)';
    case 'NONE':
      return 'var(--color-negative-dark)';
    case 'SHORT':
      return 'var(--color-brand-dark)';
    case 'MEDIUM':
      return 'var(--color-brand-dark)';
    case 'LONG':
      return 'var(--color-positive-dark)';
    case 'SKIP':
      return 'var(--color-white)';
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

export default withProps({
  styles: {
    control: (base, state) => {
      const value = pathOr('SKIP', [0, 'value'], state.getValue());
      return {
        ...base,
        background: getColor(value),
        color: getForeground(value),
        boxShadow: state.isFocused ? focusShadow.default : 'none',
        cursor: 'pointer',
        borderWidth: 0,
        borderRadius: 'var(--border-radius-md)',
      };
    },
    option: (base, { data }) => ({
      ...base,
      background: getColor(data.value),
      color: getForeground(data.value),
      cursor: 'pointer',
    }),
    singleValue: base => ({
      base,
      color: 'inherit',
    }),
    indicatorSeparator: base => ({ display: 'none' }),
    dropdownIndicator: base => ({ ...base, color: 'inherit' }),
  },
  formatOptionLabel: data => (
    <span>
      <Icon name={getIcon(data.value)} /> {getLabel(data.value)}
    </span>
  ),
  getOptionLabel: data => getLabel(data.value),
  options: ['SKIP', 'EAT_OUT', 'NONE', 'SHORT', 'MEDIUM', 'LONG'].map(
    value => ({ label: getLabel(value), value }),
  ),
  isClearable: false,
  isSearchable: false,
})(Select);
