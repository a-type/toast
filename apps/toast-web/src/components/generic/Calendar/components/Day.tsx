import styled, { keyframes } from 'styled-components';
import { DAY_SIZE } from '../constants';

const Day = styled('button')`
  border: 2px solid var(--color-gray-lightest);
  background: var(--color-gray-lightest);
  border-radius: 100%;
  width: ${DAY_SIZE}px;
  height: ${DAY_SIZE}px;
`;

export default Day;
