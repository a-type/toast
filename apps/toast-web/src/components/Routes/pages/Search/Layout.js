import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-areas: 'filters' 'results';
  grid-template-rows: auto 1fr;
  grid-gap: calc(var(--rhythm) * 2);
  justify-content: center;
  align-items: start;
  padding: 0 var(--spacing-md);

  & > * {
    width: 95vw;
    max-width: 600px;
  }

  & > *:nth-child(1) {
    grid-area: filters;
  }

  & > *:nth-child(2) {
    grid-area: results;
  }

  @media (min-width: 800px) {
    margin-top: calc(var(--rhythm) * 2);
  }
`;
