import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-areas: 'logo controls' 'search search';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-md);
  align-content: end;
  height: auto;
  margin-left: auto;
  margin-right: auto;

  & > *:first-child {
    grid-area: logo;
    justify-self: start;
  }
  & > *:nth-child(2) {
    grid-area: search;
    margin: auto;
    justify-self: center;
    width: 100%;
  }
  & > *:nth-child(3) {
    grid-area: controls;
    justify-self: end;
    margin-top: auto;
    margin-bottom: auto;
  }

  @media (min-width: 900px) {
    width: auto;
    grid-template-areas: 'logo search controls';
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
    margin-left: 0;
    height: calc(var(--rhythm) * 2);
    padding: 0 var(--spacing-xl);
    width: 900px;
    grid-gap: var(--spacing-lg);

    & > *:nth-child(2) {
      width: 100%;
    }
  }

  @media (min-width: 1600px) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;

    max-width: 900px;

    & > *:nth-child(2) {
      /* width: 600px; */
    }
  }
`;
