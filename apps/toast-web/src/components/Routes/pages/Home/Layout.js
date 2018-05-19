import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-areas: 'search' 'results';
  grid-template-rows: auto 1fr;
  grid-gap: 50px;
  justify-content: center;
  align-items: start;
  padding: 0 20px;

  & > *:nth-child(1) {
    grid-area: search;
    margin-top: 10vh;
  }
  & > *:nth-child(2) {
    grid-area: results;
  }
`;
