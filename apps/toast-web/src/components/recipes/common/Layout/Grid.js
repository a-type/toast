import styled from 'styled-components';
import { LARGE_PADDING_LEFT, LARGE_BREAKPOINT } from './constants';

export default styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'details'
    'ingredients'
    'steps'
    'jumpControls';
  grid-template-rows: calc(var(--rhythm) * 15) repeat(4, auto);
  padding-left: ${LARGE_PADDING_LEFT}px;

  @media (max-width: ${LARGE_BREAKPOINT}px) {
    padding-left: 0;
    padding-right: 0;
  }
`;
