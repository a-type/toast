import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 10px;

  & > * {
    margin: 0;
    padding: 20px;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
