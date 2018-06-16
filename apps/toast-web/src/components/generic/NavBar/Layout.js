import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-areas: 'logo user' 'search search';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm);
  align-content: end;
  height: auto;

  & > *:first-child {
    grid-area: logo;
  }
  & > *:nth-child(2) {
    grid-area: search;
    margin: auto;
  }

  @media (min-width: 800px) {
    grid-template-areas: 'logo search user';
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
    height: calc(var(--rhythm) * 2);
    padding: 0 var(--spacing-md);
  }
`;
