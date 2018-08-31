import styled from 'styled-components';

export default styled.div`
  background: var(--color-gray-light);
  color: var(--color-dark);
  border-radius: 6px;

  display: flex;
  flex-direction: row;

  & > * {
    flex: 0 0 auto;
  }
  & > *:first-child {
    flex: 1;
  }
`;
