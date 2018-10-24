import styled from 'styled-components';
import { getIconColor } from '../../common';

const SIZE = 10;

export default styled<{ value: string }, 'div'>('div')`
  width: 0;
  height: 0;
  background: transparent;
  border-color: transparent;
  border-top-color: ${({ value }) => getIconColor(value)};
  border-width: ${SIZE}px;
  border-left-width: ${SIZE * (2 / 3)}px;
  border-right-width: ${SIZE * (2 / 3)}px;
  border-style: solid;
`;
