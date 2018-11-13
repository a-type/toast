import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);

  & > button {
    align-self: flex-start;
  }
`;
