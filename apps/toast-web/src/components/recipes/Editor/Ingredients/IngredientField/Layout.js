import styled, { css } from 'styled-components';

export default styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;

  & > * {
    min-width: 0;
  }
`;
