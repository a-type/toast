import React from 'react';
import Select from 'react-select';
import { withProps } from 'recompose';
import { focusShadow } from 'components/effects';
import { pathOr } from 'ramda';
import { getColor, getForeground, getIcon, getLabel } from './common';
import Icon from './Icon';

export default withProps({
  styles: {
    container: base => ({
      ...base,
      flex: '1',
    }),
    control: (base, state) => {
      const value = pathOr('SKIP', [0, 'value'], state.getValue());
      return {
        ...base,
        background: '#ffffffc0',
        color: getForeground(value),
        boxShadow: state.isFocused ? focusShadow.default : 'none',
        cursor: 'pointer',
        borderWidth: 0,
        borderRadius: 'var(--border-radius-md)',
        height: '100%',
        justifyContent: 'center',
      };
    },
    option: (base, { data }) => ({
      ...base,
      background: getColor(data.value),
      color: getForeground(data.value),
      cursor: 'pointer',
      textAlign: 'center',
    }),
    singleValue: base => ({
      base,
      color: 'inherit',
      textAlign: 'center',
      textShadow: '0 0 12px white',
    }),
    indicatorSeparator: base => ({ display: 'none' }),
    dropdownIndicator: base => ({ ...base, color: 'inherit' }),
    valueContainer: base => ({
      ...base,
      justifyContent: 'center',
    }),
  },
  formatOptionLabel: data => (
    <span>
      <Icon value={data.value} /> {getLabel(data.value)}
    </span>
  ),
  getOptionLabel: data => getLabel(data.value),
  options: ['SKIP', 'EAT_OUT', 'NONE', 'SHORT', 'MEDIUM', 'LONG'].map(
    value => ({ label: getLabel(value), value }),
  ),
  isClearable: false,
  isSearchable: false,
})(Select);
