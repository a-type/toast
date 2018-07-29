import styled from 'styled-components';

export default styled.div`
  padding: var(--spacing-sm);

  & > * {
    max-width: 720px;
  }

  @media (min-width: 768px) {
    padding: var(--spacing-lg);
  }
`;
