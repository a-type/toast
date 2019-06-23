import styled from 'styled-components';
import { ROW_SPACING, DAY_SIZE } from '../constants';

export interface GridProps {
  rows: number;
}

const Grid = styled<GridProps, 'div'>('div')`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
  align-content: space-between;
  justify-content: space-between;
  justify-items: center;
  row-gap: ${ROW_SPACING}px;
  overflow: hidden;

  transition: 0.2s ease all;

  height: ${props => props.rows * DAY_SIZE + (props.rows + 1) * ROW_SPACING}px;
  padding-top: ${ROW_SPACING}px;
  padding-bottom: ${ROW_SPACING}px;

  @media (min-width: 768px) {
    align-content: space-around;
  }
`;

export default Grid;
