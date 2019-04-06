import styled from 'styled-components';

export default styled.div`
  padding: var(--spacing-md);

  & > * {
    max-width: 720px;
  }

  @media (min-width: 768px) {
    padding: var(--spacing-xl);
  }
`;
