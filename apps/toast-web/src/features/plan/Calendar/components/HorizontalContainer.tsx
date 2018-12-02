import styled from 'styled-components';

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: visible;
  padding: var(--spacing-sm) var(--spacing-sm);
  width: 100%;

  & > * {
    flex: 0 0 auto;
  }

  & > * + * {
    margin-left: var(--spacing-md);
  }
`;

export default HorizontalContainer;
