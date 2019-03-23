import styled, { keyframes } from 'styled-components';
import { DAY_SIZE } from '../constants';
import { focusShadow } from 'components/effects';

export interface DayProps {
  faded?: boolean;
  selected?: boolean;
  highlighted?: boolean;
}

const Day = styled<DayProps, 'button'>('button')`
  cursor: pointer;
  border: 2px solid
    ${props =>
      props.selected ? 'var(--color-brand)' : props.highlighted ? 'var(--color-positive)' : 'var(--color-gray-lightest)'};
  background: ${props =>
    props.selected ? 'var(--color-brand)' : 'transparent'};
  border-radius: 100%;
  width: ${DAY_SIZE}px;
  height: ${DAY_SIZE}px;
  font-family: var(--font-default);

  opacity: ${props => (props.faded ? '0.5' : '1')};
  transition: 0.2s ease all;

  &:focus {
    outline: 0;
    box-shadow: ${focusShadow.default};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export default Day;
