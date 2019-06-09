import styled from 'styled-components';
import { DAY_SIZE } from '../constants';

export interface DayProps {
  faded?: boolean;
  selected?: boolean;
  highlighted?: boolean;
}

const Day = styled<DayProps, 'button'>('button')`
  cursor: pointer;
  border: 2px solid
    ${props =>
      props.selected
        ? 'var(--color-primary)'
        : props.highlighted
        ? 'var(--color-secondary)'
        : 'var(--color-gray-lightest)'};
  background: ${props =>
    props.selected ? 'var(--color-primary)' : 'transparent'};
  border-radius: 100%;
  width: ${DAY_SIZE}px;
  height: ${DAY_SIZE}px;
  font-family: var(--font-default);

  opacity: ${props => (props.faded ? '0.5' : '1')};
  transition: 0.2s ease all;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export default Day;
