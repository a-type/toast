import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;

  & > *:last-child {
    box-shadow: 0px -8px 8px 8px var(--color-popover-background);
    flex: 0 0 auto;
  }
`;
