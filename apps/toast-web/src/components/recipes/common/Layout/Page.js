import styled from 'styled-components';
import { CONTENT_WIDTH, LARGE_BREAKPOINT } from './constants';

export default styled.div`
  position: relative;
  z-index: -1;
  grid-area: details / details / steps / steps;
  background: var(--color-white);
  width: ${CONTENT_WIDTH}px;
  border-radius: 10px;
  border: 1px solid var(--color-gray-light);

  @media (max-width: ${LARGE_BREAKPOINT}px) {
    width: auto;
  }
`;
