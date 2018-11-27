import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--spacing-md);
  padding-bottom: var(--spacing-lg);
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;

  & > * {
    flex: 0 0 auto;
  }

  & > div + div {
    margin-left: var(--spacing-md);
  }
`;
