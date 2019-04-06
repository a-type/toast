import * as React from 'react';
import Icon from 'components/generic/Icon';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > *:first-child {
    margin: auto;
  }
`;

const scanAnimation = keyframes`
  0% {
    height: 2px;
    top: 0%;
  }

  30% {
    height: 40px;
    top: 50%;
  }

  60% {
    height: 0px;
    top: 100%;
  }

  100% {
    height: 0px;
    top: 100%;
  }
`;

const ScanLine = styled.div`
  background: #ab5f0f80;
  position: absolute;
  left: 0;
  right: 0;

  animation-name: ${scanAnimation};
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;

const RecipeLinkerLoader: React.SFC<{}> = () => {
  return (
    <Container>
      <Icon name="list-view" size="30vmin" color="#ab5f0f" />
      <ScanLine />
    </Container>
  );
};

export default RecipeLinkerLoader;
