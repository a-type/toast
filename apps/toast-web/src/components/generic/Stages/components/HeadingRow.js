import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: var(--spacing-sm);

  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > h2 {
    margin-bottom: 3px;
    margin-left: var(--spacing-sm);
  }
`;