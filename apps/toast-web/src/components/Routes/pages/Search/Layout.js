import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-areas: 'filters' 'results';
  grid-template-rows: auto 1fr;
  grid-template-columns: minmax(auto, 600px);
  grid-gap: calc(var(--rhythm) * 2);
  justify-content: center;
  align-items: start;
  padding: 0 var(--spacing-md);

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
