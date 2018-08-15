import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-lg);

  & > button {
    align-self: flex-start;
  }
`;
