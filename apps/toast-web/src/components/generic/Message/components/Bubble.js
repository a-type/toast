import styled, { keyframes } from 'styled-components';
import { DISMISS_ANIMATION_MS } from '../constants';

const show = keyframes`
  from {
    transform: translateX(1000px);
  }

  to {
    transform: translateX(0);
  }
`;

const dismiss = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(1000px);
  }
`;

export default styled.div`
  background: var(--color-brand);
  color: var(--color-dark);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 8px 0 #00000080;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 0.9rem;
  animation-fill-mode: forwards;
  transition: 0.1s ease all;
  pointer-events: initial;

  animation-name: ${show};
  animation-duration: 200;
  animation-timing-function: ease-out;

  & + & {
    margin-top: var(--spacing-sm);
  }

  &.dismissing {
    animation-name: ${dismiss};
    animation-duration: ${DISMISS_ANIMATION_MS / 1000}s;
    animation-timing-function: ease-in;
  }
`;
