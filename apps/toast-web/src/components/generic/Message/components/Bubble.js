import styled from 'styled-components';

export default styled.div`
  background: var(--color-brand);
  color: var(--color-white);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 8px 0 #00000080;

  & + & {
    margin-top: var(--spacing-sm);
  }
`;
