import styled from 'styled-components';

const SIZE = '22px';

export default styled.label`
  cursor: pointer;
  position: relative;
  user-select: none;
  padding: 0 0 0 calc(${SIZE} + 10px);
  display: block;
  font-size: var(--font-size-md);

  &::before,
  &::after {
    content: '';

    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
  }

  &::before {
    background: var(--color-white);
    border: 1px dashed var(--color-gray);
    width: ${SIZE};
    height: ${SIZE};
  }

  &::after {
    width: 0;
    height: 0;
    border-radius: 50%;
    border: 1px solid transparent;
  }

  input:focus + &::before {
    border-style: solid;
  }

  input:hover + &::after,
  input:checked + &::after {
    width: ${SIZE};
    height: ${SIZE};
    border-radius: 0;
    background: var(--color-brand-light);
  }

  input:checked + &::after {
    background: var(--color-brand);
  }
`;
