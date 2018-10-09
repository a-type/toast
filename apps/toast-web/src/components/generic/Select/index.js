import React from 'react';
import Select from 'react-select';
import { withProps } from 'recompose';
import { focusShadow } from 'components/effects';

export default withProps({
  styles: {
    control: (base, state) => {
      return {
        ...base,
        background: 'var(--color-gray-lightest)',
        color: 'var(--color-black)',
        boxShadow: state.isFocused ? focusShadow.default : 'none',
        cursor: 'pointer',
        borderWidth: 0,
        borderRadius: 'var(--border-radius-md)',
        justifyContent: 'center',
      };
    },
    menu: base => ({
      ...base,
      background: 'var(--color-gray-lightest)',
      borderRadius: 'var(--border-radius-md)',
    }),
    option: (base, { data }) => ({
      ...base,
      background: 'var(--color-gray-lightest)',
      color: 'var(--color-black)',
      cursor: 'pointer',
    }),
    singleValue: base => ({
      base,
      color: 'inherit',
    }),
    indicatorSeparator: base => ({ display: 'none' }),
    dropdownIndicator: base => ({ ...base, color: 'inherit' }),
  },
})(Select);
