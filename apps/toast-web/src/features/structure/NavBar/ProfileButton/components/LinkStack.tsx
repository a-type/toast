import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin: var(--spacing-sm) auto;
  }
`;
