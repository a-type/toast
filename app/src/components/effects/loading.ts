import styled, { css, keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  from { opacity: 0.1 }
  to: { opacity: 1 }
`;

export default css`
  animation: ${loadingAnimation} 3s ease infinite;
  animation-direction: alternate;
`;
