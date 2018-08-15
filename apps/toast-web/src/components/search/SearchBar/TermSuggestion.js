import styled from 'styled-components';

export default styled.button`
  display: block;
  background: var(--color-brand);
  color: var(--color-white);
  /* height: calc(var(--rhythm) * 2); */
  line-height: calc(var(--rhythm) * 2);
  list-style-type: none;
  padding: 0 var(--spacing-lg);
  cursor: pointer;
  border: 0;
  outline: none;
  font-family: var(--font-default);
  font-size: var(--font-size-lg);
  margin: 0;
  width: 100%;
  display: block;
  text-align: left;
  transition: 0.2s ease all;

  &:hover {
    background: var(--color-brand-dark);
  }

  &:focus,
  &:active {
    outline: none;
    background-color: var(--color-brand-light);
    color: var(--color-dark);
  }
`;
