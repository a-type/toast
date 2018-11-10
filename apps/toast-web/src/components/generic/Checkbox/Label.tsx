import styled from 'styled-components';

const SIZE = 32;

export default styled.label`
  position: relative;
  user-select: none;
  display: inline-block;
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: 0.2s ease all;
  min-height: ${SIZE}px;
  min-width: ${SIZE}px;
  padding: 4px 0 5px calc(${SIZE}px + 10px);
  position: relative;
  user-select: none;

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
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  &::after {
    content: '\f11d';
    color: var(--color-white);
    font-family: 'Toast2';
    font-size: ${(SIZE * 5) / 8}px;
    font-weight: bold;
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
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
