import styled from 'styled-components';
import { DURATION } from '../constants';

export default styled.div`
  background: var(--color-popover-background);
  color: var(--color-popover-foreground);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80vh;
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  transition: ${DURATION / 1000.0}s ease-in all;
  pointer-events: initial;
  box-shadow: 0 -6px 16px 0 var(--color-shadow-dark);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border: 2px solid var(--color-gray-lightest);

  &.appear-appear {
    bottom: -80vh;
  }
  &.appear-appear.appear-appear-active {
    bottom: 0;
  }

  &.appear-exit {
    bottom: 0;
  }
  &.appear-exit.appear-exit-active {
    bottom: -80vh;
  }

  & > * {
    padding: var(--spacing-md);
    flex: 1 1 auto;
  }

  @media (min-width: 700px) {
    left: 50%;
    width: 100vw;
    max-width: 700px;
    transform: translateX(-50%);
  }

  @media (min-width: 1200px) {
    max-width: 900px;
  }
`;
