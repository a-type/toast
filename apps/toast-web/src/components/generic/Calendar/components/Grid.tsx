import styled from 'styled-components';
import { ROW_SPACING, DAY_SIZE } from '../constants';

const Grid = styled<{ rows: number }, 'div'>('div')`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
  align-content: space-between;
  justify-content: space-between;
  justify-items: center;
  row-gap: ${ROW_SPACING}px;
  margin-bottom: var(--spacing-md);

  transition: 0.2s ease all;

  height: ${props => props.rows * DAY_SIZE + (props.rows - 1) * ROW_SPACING}px;
`;

export default Grid;
