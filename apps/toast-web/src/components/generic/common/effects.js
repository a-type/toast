import styled, { css, keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export const loading = css`
  background: linear-gradient(
    230deg,
    var(--color-gray-lightest),
    var(--color-white)
  );
  background-size: 400% 400%;
  animation: ${loadingAnimation} 3s ease infinite;
`;

export const focusShadow = color => `0 0 0 4px var(--color-${color})`;
focusShadow.default = focusShadow('brand-light');
