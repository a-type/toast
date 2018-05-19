import styled, { css, keyframes } from 'styled-components';
import { loading } from '../common/effects';

const sharedSolidStyles = css`
  padding: 10px 15px;
  font-size: 1rem;
  background: var(--color-gray-lightest);
  border-radius: 6px;
  outline: none;
  border: 1px solid var(--color-gray-lightest);
  font-family: var(--font-default);
  width: 100%;

  &:disabled {
    background: var(--color-disabled-background);
    border-color: var(--color-disabled-background);
    color: var(--color-disabled);
  }

  &:active:not(:disabled),
  &:focus:not(:disabled) {
    border: 1px dashed var(--color-gray);
    outline: none;
  }

  ${props =>
    props.invalid &&
    `
    border-color: var(--color-negative);
  `};
`;

const Input = styled.input`
  ${sharedSolidStyles} ${props => (props.loading ? loading : '')};
`;

Input.defaultProps = {
  loading: false,
};

Input.H1 = styled(Input)`
  font-size: 1.8rem;
  font-family: var(--font-fancy);
  -webkit-margin-after: 0.67em;
  -webkit-margin-before: 0.67em;
`;

Input.Block = styled('textarea')`
  ${sharedSolidStyles} width: 100%;
`;

export default Input;
