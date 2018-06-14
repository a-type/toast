import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-areas: 'search' 'featured';
  grid-template-rows: auto 1fr;
  grid-gap: calc(var(--rhythm) * 2);
  justify-content: center;
  align-items: start;
  padding: 0 var(--spacing-md);

  & > *:nth-child(1) {
    grid-area: search;
    margin-top: calc(var(--rhythm) * 2);
    width: 95vw;
    max-width: 600px;
  }
`;
