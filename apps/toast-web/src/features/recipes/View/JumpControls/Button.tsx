import styled from 'styled-components';

export default styled.button`
  background: transparent;
  border: 0;
  outline: none;
  transition: 0.2s ease all;

  &:active {
    background: var(--color-brand);
    color: var(--color-white);
  }

  &:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  &:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  & + & {
    border-left: 1px dashed var(--color-gray-light);
  }
`;
