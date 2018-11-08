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
  transition: 0.2s ease all;

  &::before,
  &::after {
    content: '';
    border-radius: var(--border-radius-lg);
    display: inline-block;
    z-index: 0;
    transition: 0.2s ease all;
  }

  &::before {
    background: var(--color-white);
    border: 4px solid var(--color-gray-light);
    width: ${SIZE - 8}px;
    height: ${SIZE - 8}px;
  }

  &::after {
    content: '\f11d';
    color: var(--color-white);
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

  input:checked + &::before {
    background: var(--color-brand);
    border-color: var(--color-brand);
  }

  &:focus,
  &:active {
    outline: 0;
  }
`;
