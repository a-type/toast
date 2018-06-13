import { css } from 'styled-components';
import { CONTENT_WIDTH, LARGE_BREAKPOINT } from '../constants';

export default css`
  display: grid;
  grid-template-columns: minmax(auto, ${CONTENT_WIDTH}px) 1fr;
  grid-auto-rows: auto;

  @media (max-width: ${LARGE_BREAKPOINT}px) {
    grid-template-columns: auto;
  }

  & > * {
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--rhythm);
  }
`;
