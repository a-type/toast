import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import { getCss } from 'components/utils/rhythm';
import { focusShadow } from 'components/generic/common/effects';

const Button = styled.button`
  border: 2px solid var(--color-brand);
  color: var(--color-brand);
  cursor: pointer;
  background: var(--color-white);
  font-family: var(--font-default);
  font-style: italic;
  font-size: var(--font-size-md);
  border-radius: 8px;
  transition: 0.25s ease-in-out;
  display: inline-block;
  vertical-align: top;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    outline: none;
    border-color: var(--color-brand);
    background: var(--color-brand);
    color: var(--color-dark);
  }
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow.default};
  }

  &:active {
    outline: none;
    border-color: var(--color-brand-light);
    background: var(--color-brand-light);
    color: var(--color-dark);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    border-color: var(--color-gray-light);
    background: var(--color-gray-lightest);
    color: var(--color-gray);
  }

  padding: 5px 11px;

  & + & {
    margin-left: var(--spacing-sm);
  }
`;

Button.Ghost = styled(Button)`
  background: transparent;
  border-style: dotted;
  border-color: var(--color-gray-light);
  color: var(--color-gray);

  &:active {
    border-color: var(--color-brand);
    background: transparent;
  }

  &:hover,
  &:focus {
    background: var(--color-white);
    border-color: var(--color-brand-light);
    color: var(--color-dark);
  }
`;

Button.Positive = styled(Button)`
  border-color: var(--color-positive);
  color: var(--color-positive);

  &:hover,
  &:focus {
    border-color: var(--color-positive);
    background: var(--color-positive-light);
  }

  &:active {
    border-color: var(--color-positive);
    background: var(--color-positive);
    color: var(--color-white);
  }
`;

Button.Negative = styled(Button)`
  border-color: var(--color-negative);
  color: var(--color-negative);

  &:hover,
  &:active {
    border-color: var(--color-negative);
    background: var(--color-negative-light);
  }

  &:focus {
    border-color: var(--color-negative);
    background: var(--color-negative);
    color: var(--color-white);
  }
`;

const InternalIconButton = styled.button`
  border: 0;
  background: transparent;
  outline: none;
  cursor: pointer;
  padding: 0;
  margin: auto;
  color: inherit;

  &:focus > i,
  &:hover > i {
    color: var(--color-brand);
  }
`;

Button.Icon = ({ name, iconProps, ...others }) => (
  <InternalIconButton {...others}>
    <Icon name={name} {...iconProps} />
  </InternalIconButton>
);

export default Button;
