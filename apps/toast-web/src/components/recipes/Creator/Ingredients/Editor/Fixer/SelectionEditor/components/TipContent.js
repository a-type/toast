import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: var(--spacing-md);
  }
`;
