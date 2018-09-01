import styled from 'styled-components';

export default styled.div`
  position: fixed;
  bottom: var(--spacing-sm);
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  display: flex;
  flex-direction: column;

  @media (min-width: 720px) {
    left: auto;
  }
`;
