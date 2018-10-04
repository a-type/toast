import React from 'react';
import styled from 'styled-components';
import { focusShadow } from 'components/effects';
import { Icon, Loader } from 'components/generic';

export const getColor = ({ value }) => {
  switch (value) {
    case 'EAT_OUT':
      return 'var(--color-gray-dark)';
    case 'NONE':
      return 'var(--color-negative)';
    case 'SHORT':
      return 'var(--color-brand)';
    case 'MEDIUM':
      return 'var(--color-brand)';
    case 'LONG':
      return 'var(--color-positive)';
    case 'SKIP':
      return 'var(--color-gray)';
    default:
      return 'var(--color-gray-lightest)';
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

const Select = styled.select`
  background: transparent;
  font-family: var(--font-default);
  font-size: var(--font-size-md);
  color: var(--color-black);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 2px solid ${getColor};
  display: block;
  cursor: pointer;
  width: 100%;
  padding-left: 40px;

  &:focus {
    outline: none;
    box-shadow: ${focusShadow.default};
  }
`;

const Wrapper = styled.div`
  background: var(--color-white);
  color: ${getColor};
  border-radius: var(--border-radius-md);
  position: relative;

  & > *:first-child {
    position: absolute;
    top: 50%;
    left: var(--spacing-md);
    transform: translateY(-50%);
  }
`;

export default class AvailabilityPicker extends React.Component {
  state = {
    loading: false,
  };

  handleChange = async ev => {
    this.setState({ loading: true });
    await this.props.onChange(ev.target.value);
    this.setState({ loading: false });
  };

  render() {
    const { value } = this.props;
    const { loading } = this.state;

    return (
      <Wrapper value={value}>
        {loading ? <Loader /> : <Icon name={getIcon(value)} />}
        <Select value={value} onChange={this.handleChange}>
          {['SKIP', 'EAT_OUT', 'NONE', 'SHORT', 'MEDIUM', 'LONG'].map(val => (
            <option value={val} key={val}>
              {getLabel(val)}
            </option>
          ))}
        </Select>
      </Wrapper>
    );
  }
}
