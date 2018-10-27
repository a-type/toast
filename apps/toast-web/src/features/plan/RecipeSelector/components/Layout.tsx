import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > *:first-child {
    flex: 1;
    overflow-y: auto;
  }

  & > *:last-child {
    box-shadow: 0px -8px 8px 8px var(--color-popover-background);
    flex: 0 0 auto;
  }
`;
