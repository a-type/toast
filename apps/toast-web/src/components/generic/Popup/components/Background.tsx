import styled from 'styled-components';
import { DURATION } from '../constants';
import { CLASS_NAMES } from 'components/layouts/constants';

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
  box-shadow: 0 -4px 8px 0 #280f3420;
  display: flex;
  flex-direction: column;
  overflow: hidden;

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

  & > .${CLASS_NAMES.CONTENT} {
    padding: var(--spacing-md);
    flex: 1 1 auto;
    overflow-y: auto;
  }

  & > .${CLASS_NAMES.CONTROLS} {
    position: relative;
    flex: 0 0 auto;
    box-shadow: 0px -8px 8px 8px var(--color-popover-background);
    padding: var(--spacing-md);
    padding-bottom: var(--spacing-lg);
  }
`;
