import styled from 'styled-components';

const SIZE = 32;

export default styled.label`
  position: relative;
  user-select: none;
  display: inline-block;
  font-size: var(--font-size-md);
  cursor: pointer;
  width: ${SIZE}px;
  height: ${SIZE}px;

  &::before,
  &::after {
    content: '';
    border-radius: var(--border-radius-md);
    display: inline-block;
    z-index: 0;
  }

  &::before {
    background: var(--color-gray-lightest);
    border: 0;
    width: ${SIZE}px;
    height: ${SIZE}px;
  }

  &::after {
    content: '\f11d';
    font-family: 'Toast2';
    font-size: ${(SIZE * 3) / 4}px;
    font-weight: bold;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: 0.2s ease all;
    opacity: 0;
  }

  input:checked + &::after {
    opacity: 1;
  }
`;
