import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  & > * + * {
    margin-left: var(--spacing-md);
  }
`;
