import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  45% {
    transform: rotate(390deg);
  }

  50% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export default styled.div`
  display: flex;

  & > span {
    animation: ${spin} 1s infinite;
    animation-delay: 0s;
    margin: auto;
  }
`;
