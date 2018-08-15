import styled from 'styled-components';

const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--spacing-sm);
  font-size: var(--font-size-md);

  & > * + * {
    margin-left: var(--spacing-sm);
  }
`;

export default StatusRow;
