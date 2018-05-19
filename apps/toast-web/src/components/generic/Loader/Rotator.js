import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(0deg);
  }

  95% {
    transform: rotate(390deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export default styled.div`
  animation: ${spin} 1s infinite;
  animation-delay: 0s;
  margin: auto;
`;
