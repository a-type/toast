import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: var(--spacing-sm);

  & > * {
    margin: auto;
    margin-left: 0;
  }

  & > * + *:last-child {
    margin-right: 0;
    margin-left: auto;
  }
`;
