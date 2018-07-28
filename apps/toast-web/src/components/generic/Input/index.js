import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { loading } from '../common/effects';

const sharedSolidStyles = css`
  font-size: var(--font-size-md);
  background: var(--color-gray-lightest);
  border-radius: 6px;
  outline: none;
  border: 1px solid var(--color-gray-lightest);
  font-family: var(--font-default);
  display: inline-block;
  vertical-align: top;

  &:disabled {
    background: var(--color-disabled-background);
    border-color: var(--color-disabled-background);
    color: var(--color-disabled);
  }

  &:active:not(:disabled),
  &:focus:not(:disabled) {
    outline: none;
  }

  ${props =>
    props.invalid &&
    `
    border-color: var(--color-negative);
  `};

  padding: 5px 11px;
`;

const Input = styled.input`
  ${sharedSolidStyles} ${props => (props.loading ? loading : '')};
`;

Input.defaultProps = {
  loading: false,
};

Input.H1 = styled(Input)`
  font-size: var(--font-size-xl);
  font-family: var(--font-fancy);
  display: inline-block;
  margin-top: 6px;
  padding-bottom: 0;
`;

Input.Block = styled('textarea')`
  ${sharedSolidStyles} width: 100%;
  margin-bottom: auto;
`;

export default Input;
