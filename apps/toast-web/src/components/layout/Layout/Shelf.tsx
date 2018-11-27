import styled from 'styled-components';

export default styled<{ expanded?: boolean }, 'div'>('div')`
  transition: 0.2s ease all;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  left: ${props => (props.expanded ? '2vw' : '100vw')};
  background: var(--color-popover-background);
  color: var(--color-popover-foreground);
  z-index: 999;
  overflow-y: auto;
  box-shadow: ${props =>
    props.expanded
      ? '-10px 0 0 18px var(--color-shadow)'
      : '0 0 0 0 transparent'};
`;
