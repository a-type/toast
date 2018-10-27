import styled from 'styled-components';

export default styled.div`
  background: var(--color-gray-light);
  color: var(--color-dark);
  border-radius: var(--border-radius-md);

  display: flex;
  flex-direction: row;

  & > * {
    flex: 0 0 auto;
  }
  & > *:first-child {
    flex: 1;
    margin: 0;
  }
`;
