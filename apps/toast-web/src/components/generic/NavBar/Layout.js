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
  }
  & > *:nth-child(3) {
    grid-area: user;
    justify-self: end;
    margin-top: auto;
    margin-bottom: auto;
  }

  @media (min-width: 700px) {
    grid-template-areas: 'logo search user';
    grid-template-columns: calc(100px - var(--spacing-sm)) 1fr calc(
        100px - var(--spacing-sm)
      );
    grid-template-rows: auto;
    height: calc(var(--rhythm) * 2);
    padding: 0 var(--spacing-md);
  }

  @media (min-width: 800px) {
    grid-template-columns: 1fr 600px 1fr;
    max-width: 1200px;
  }
`;
