import styled, { css } from 'styled-components';

const activeStyles = css`
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
`;

export default styled.input`
  padding: 20px;
  width: 100%;
  border-width: 1px;
  border-style: dashed;
  border-color: var(--color-black);
  font-family: inherit;
  font-size: 16px;
  background: var(--color-white);
  transition: 0.5s ease all;

  &:focus,
  &:active,
  &:not([value='']) {
    outline: none;
  }

  ${props => (props.active ? activeStyles : '')};
`;
