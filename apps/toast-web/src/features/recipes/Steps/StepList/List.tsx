import styled from 'styled-components';

const StepList = styled.ol`
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: var(--rhythm);
  list-style-type: none;

  & li {
    margin-top: 4px;
    margin-bottom: -4px;
  }
`;

export default StepList;
