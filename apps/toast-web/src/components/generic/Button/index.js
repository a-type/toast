import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import { focusShadow } from 'components/effects';

const Button = styled.button`
  border: 2px solid var(--color-brand);
  color: var(--color-dark);
  cursor: pointer;
  background: var(--color-brand);
  font-family: var(--font-default);
  font-style: italic;
  font-size: var(--font-size-md);
  border-radius: var(--border-radius-md);
  transition: 0.25s ease-in-out;
  display: inline-block;
  position: relative;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    outline: none;
    box-shadow: ${focusShadow.default};
    z-index: 1;
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
    margin-left: var(--spacing-md);
  }
`;

Button.Positive = styled(Button)`
  border-color: var(--color-positive);
  background: var(--color-positive);
  color: var(--color-white);

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow('positive-light')};
  }

  &:active {
    border-color: var(--color-positive-light);
    background: var(--color-positive-light);
  }
`;

Button.PositiveLight = styled(Button)`
  border-color: var(--color-positive-light);
  background: var(--color-positive-light);

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow('positive')};
  }

  &:active {
    border-color: var(--color-positive);
    background: var(--color-positive);
  }
`;

Button.Negative = styled(Button)`
  border-color: var(--color-negative);
  background: var(--color-negative);
  color: var(--color-white);

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow('negative-light')};
  }

  &:active {
    border-color: var(--color-negative-light);
    background: var(--color-negative-light);
  }
`;

Button.NegativeLight = styled(Button)`
  border-color: var(--color-negative-light);
  background: var(--color-negative-light);

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow('negative')};
  }

  &:active {
    border-color: var(--color-negative);
    background: var(--color-negative);
  }
`;

Button.Ghost = styled(Button)`
  background: transparent;
  border-style: dotted;
  border-color: var(--color-gray-light);
  color: var(--color-gray);

  &:active {
    border-color: var(--color-brand);
    border-style: solid;
    background: transparent;
  }

  &:hover,
  &:focus {
    background: var(--color-white);
    border-color: var(--color-brand-light);
    color: var(--color-dark);
    border-style: solid;
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

Button.Group = styled.div`
  display: flex;
  flex-direction: row;

  & > button {
    margin: 0;
    flex: 1;
  }

  & > button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & > button + button {
    margin-left: 0 !important;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default Button;
