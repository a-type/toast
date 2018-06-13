import styled from 'styled-components';

export default styled.ol`
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: var(--rhythm);

  & li {
    margin-top: 4px;
    margin-bottom: -4px;
  }
`;
