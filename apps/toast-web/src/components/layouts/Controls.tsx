import * as React from 'react';
import classnames from 'classnames';
import { CLASS_NAMES } from './constants';
import styled from 'styled-components';

const ControlsStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & > * + * {
    margin-left: var(--spacing-sm);
  }
`;

const Controls: React.SFC<{
  className?: string;
}> = ({ className, ...rest }) => (
  <ControlsStyles
    className={classnames(className, CLASS_NAMES.CONTROLS)}
    {...rest}
  />
);

export default Controls;
