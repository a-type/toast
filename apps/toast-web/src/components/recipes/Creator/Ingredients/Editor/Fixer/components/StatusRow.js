import styled from 'styled-components';

const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--spacing-sm) 0;
  font-size: var(--font-size-md);
  user-select: none;

  & > * + * {
    margin-left: var(--spacing-sm);
  }
`;

export default StatusRow;
