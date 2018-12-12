import styled from 'styled-components';

export default styled.div`
  background: var(--color-popover-background);
  color: var(--color-popover-foreground);

  box-shadow: 0px -8px 8px 8px var(--color-popover-background);
  z-index: 1;
  flex: 0 0 auto;

  display: flex;
  flex-direction: row;
`;
