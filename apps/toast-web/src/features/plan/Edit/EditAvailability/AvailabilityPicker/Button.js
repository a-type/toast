import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/generic';

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

const Button = styled.button`
  padding: var(--spacing-lg);
  color: ${getColor};
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: row;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  border: 0;
  outline: 0;
  align-items: center;
  cursor: pointer;
  box-shadow: ${props =>
    props.active ? '0 0 400px 400px var(--color-white)' : 'none'};
  position: relative;
  z-index: ${props => (props.active ? '1' : '0')};
  border: 2px solid ${getColor};
  transition: 0.2s ease all;

  &:focus {
    outline: 0;
  }

  & > span {
    color: var(--color-dark);
  }

  & > * {
    margin-top: auto;
    margin-bottom: auto;

    &:first-child {
      margin-left: auto;
    }
    &:last-child {
      margin-right: auto;
    }
  }
`;

const Outline = styled(Button)`
  background: var(--color-white);
  border-style: dotted;
  border-color: var(--color-gray);
`;

const PickerButton = ({ value, ...rest }) => (
  <Button value={value} {...rest}>
    <Icon name={getIcon(value)} size="32px" />
    <span>{getLabel(value)}</span>
  </Button>
);

PickerButton.Outline = Outline;

export default PickerButton;
