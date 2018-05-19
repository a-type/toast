import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > *:first-child {
    margin: 10vh auto auto auto;
    max-width: 600px;
  }
`;
