import styled from 'styled-components';

const INACTIVE_SIZE = '2px';
const MOBILE_HOVER_SIZE = '24px';
const DESKTOP_HOVER_SIZE = '6px';
const CORNER_SIZE = '6px';

const color = props => `var(--color-${props.color})`;
const mobileWidth = props => {
  if (!props.interactive) {
    return 0;
  }
  return MOBILE_HOVER_SIZE;
};
const desktopWidth = props => {
  if (!props.interactive) {
    return 0;
  }
  if (props.active) {
    return DESKTOP_HOVER_SIZE;
  }
  return INACTIVE_SIZE;
};
const cornerContent = props => (props.interactive ? '""' : '');

export interface HandleProps {
  interactive?: boolean;
  active?: boolean;
}

export default styled<HandleProps, 'div'>('div')`
  height: 1.5em;
  background: transparent;
  display: inline-block;
  cursor: ${props => (props.interactive ? 'ew-resize' : 'default')};
  transition: 0.2s ease all;
  vertical-align: bottom;
  position: relative;

  &[data-handle-type='start'] {
    padding-right: ${CORNER_SIZE};
    border-left: ${mobileWidth} solid ${color};

    &::after {
      content: ${cornerContent};
      width: 0;
      height: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: ${CORNER_SIZE} solid ${color};
      border-right: ${CORNER_SIZE} solid transparent;
    }
  }

  &[data-handle-type='end'] {
    padding-left: ${CORNER_SIZE};
    border-right: ${mobileWidth} solid ${color};

    &::after {
      content: ${cornerContent};
      width: 0;
      height: 0;
      position: absolute;
      bottom: 0;
      right: 0;
      border-bottom: ${CORNER_SIZE} solid ${color};
      border-left: ${CORNER_SIZE} solid transparent;
    }
  }

  @media (min-width: 800px) {
    &[data-handle-type='start'] {
      border-left-width: ${desktopWidth};

      &:hover {
        border-left-width: ${props =>
          props.interactive ? DESKTOP_HOVER_SIZE : 0};
      }
    }

    &[data-handle-type='end'] {
      border-right-width: ${desktopWidth};

      &:hover {
        border-right-width: ${props =>
          props.interactive ? DESKTOP_HOVER_SIZE : 0};
      }
    }
  }
`;
