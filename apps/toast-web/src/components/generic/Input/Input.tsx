import React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import { loading, focusShadow } from 'components/effects';

interface InputProps {
  loading?: boolean;
  focused?: boolean;
  invalid?: boolean;
}

export interface InputWithVariants
  extends StyledComponentClass<InputProps, 'input'> {
  Block?: StyledComponentClass<{}, any>;
}

const Input: InputWithVariants = styled<InputProps, 'input'>('input')`
  font-size: var(--font-size-md);
  background: var(--color-field-background);
  color: var(--color-field-foreground);
  border-radius: var(--border-radius-md);
  outline: none;
  border: 1px solid var(--color-field-background);
  font-family: var(--font-default);
  display: inline-block;
  transition: 0.2s ease all;

  &:disabled {
    background: var(--color-disabled-background);
    border-color: var(--color-disabled-background);
    color: var(--color-disabled);
  }

  &:active:not(:disabled),
  &:focus:not(:disabled) {
    outline: none;
    box-shadow: ${focusShadow('brand')};
  }
  box-shadow: ${props => (props.focused ? focusShadow('brand') : 'none')};

  ${props => props.invalid && `border-color: var(--color-negative);`};

  padding: 5px 11px;

  ${props => (props.loading ? loading : '')};
`;

Input.defaultProps = {
  loading: false,
};

Input.Block = styled(props => <Input as="textarea" {...props} />)`
  width: 100%;
  margin-bottom: auto;
`;

export default Input;
