import styled, { keyframes } from 'styled-components';
import { DAY_SIZE } from '../constants';
import { focusShadow } from 'components/effects';

const Day = styled<{ faded?: boolean }, 'button'>('button')`
  border: 2px solid var(--color-gray-lightest);
  background: var(--color-gray-lightest);
  border-radius: 100%;
  width: ${DAY_SIZE}px;
  height: ${DAY_SIZE}px;

  opacity: ${props => (props.faded ? '0.5' : '1')};
  transition: 0.2s ease all;

  &:focus {
    outline: 0;
    box-shadow: ${focusShadow.default};
  }
`;

export default Day;
