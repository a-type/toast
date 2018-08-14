import styled from 'styled-components';

const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--spacing-xs);
  font-size: var(--font-size-sm);

  & > * + * {
    margin-left: var(--spacing-xs);
  }
`;

export default StatusRow;
