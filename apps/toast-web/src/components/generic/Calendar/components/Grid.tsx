import styled, { keyframes, css } from 'styled-components';
import { ROW_SPACING, DAY_SIZE } from '../constants';
import { CalendarTransition, GridPosition } from '../types';

export interface GridProps {
  position?: GridPosition;
  transitionName: CalendarTransition;
  rows: number;
  prepForMove: boolean;
}

const forwards = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const backwards = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const animation = (props: GridProps) => {
  switch (props.transitionName) {
    case CalendarTransition.Backwards:
      return css`
        animation: ${backwards} 0.2s ease;
      `;
    case CalendarTransition.Forwards:
      return css`
        animation: ${forwards} 0.2s ease;
      `;
    default:
      return '';
  }
};

const Grid = styled<GridProps, 'div'>('div')`
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

  will-change: ${props => (props.prepForMove ? 'transform' : 'none')};

  ${animation};
`;

export default Grid;
