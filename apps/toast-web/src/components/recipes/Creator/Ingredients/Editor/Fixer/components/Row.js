import styled from 'styled-components';

const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-md);
  user-select: none;

  & > * + * {
    margin-left: var(--spacing-sm);
  }
`;

export default StatusRow;
