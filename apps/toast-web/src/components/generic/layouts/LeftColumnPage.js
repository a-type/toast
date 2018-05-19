import styled from 'styled-components';

export default styled.div`
  width: 100%;
  max-width: 600px;
  margin-left: 10vw;
  margin-right: auto;
  margin-top: 20vh;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media only screen and (max-device-width: 600px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 100vw;
  }
`;
