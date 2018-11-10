import styled from 'styled-components';

export default styled.div`
  background: var(--color-popover-background);
  border-radius: 25px;
  display: flex;
  flex-direction: row;

  & > *:not(:last-child) {
    margin-right: var(--spacing-md);
  }
`;
