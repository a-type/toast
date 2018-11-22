import styled from 'styled-components';

export default styled.div`
  background: var(--color-popover-background);
  border-radius: 27px;
  display: flex;
  flex-direction: row;
  padding: 2px;

  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > *:not(:last-child) {
    margin-right: var(--spacing-md);
  }
`;
