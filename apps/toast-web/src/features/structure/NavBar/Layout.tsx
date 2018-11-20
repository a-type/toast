import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-areas: 'logo controls';
  grid-template-columns: 1fr auto;
  grid-template-rows: auto;
  grid-gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-md);
  align-content: end;
  height: auto;
  margin-left: auto;
  margin-right: auto;

  & > *[data-grid-area='logo'] {
    grid-area: logo;
    justify-self: start;
  }
  & > *[data-grid-area='controls'] {
    grid-area: controls;
    margin: auto;
  }

  @media (min-width: 1000px) {
    width: auto;
    height: calc(var(--rhythm) * 2);
    padding: 0 var(--spacing-lg);
    grid-gap: var(--spacing-lg);
  }

  @media (min-width: 1600px) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
`;
