import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Button = styled.button`
  padding: 5px 15px;
  border: 1px solid var(--color-gray);
  color: var(--color-gray);
  cursor: pointer;
  background: var(--color-white);
  font-family: var(--font-default);
  font-style: italic;
  font-size: 1rem;
  border-radius: 6px;
  transition: 0.25s ease-in-out;

  &:hover,
  &:focus {
    outline: none;
    border-color: var(--color-brand);
    background: var(--color-brand);
    color: var(--color-dark);
  }

  &:active {
    outline: none;
    border-color: var(--color-brand-light);
    background: var(--color-brand-light);
    color: var(--color-dark);
  }
`;

Button.Ghost = styled(Button)`
  background: transparent;
  border: 1px solid transparent;

  &:hover,
  &:focus {
    border-color: var(--color-brand);
    background: transparent;
  }

  &:active {
    background: var(--color-brand-light);
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

  &:focus > i,
  &:hover > i {
    color: var(--color-brand);
  }
`;

Button.Icon = ({ name, ...others }) => (
  <InternalIconButton {...others}>
    <Icon name={name} />
  </InternalIconButton>
);

export default Button;
