import styled from 'styled-components';

export default styled.div`
  position: fixed;
  bottom: var(--spacing-sm);
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  height: 40px;
  background: var(--color-white);
  border: 1px solid var(--color-gray-light);
  box-shadow: 0 4px 8px 0 #10000010;

  & > button {
    flex: 1;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;
