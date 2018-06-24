import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-row-gap: var(--rhythm);

  & > textarea {
    width: 100%;
  }
`;
