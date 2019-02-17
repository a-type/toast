import React, { SFC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { BackdropArt } from 'components/brand';
import { Icon } from 'components/generic';
import { Button } from 'grommet';

const ToggleButtonStyle = styled(Button)`
  position: fixed;
  left: var(--spacing-sm);
  bottom: var(--spacing-sm);
  z-index: 100000;
  font-size: 32px;
  background: var(--color-brand);
  border-radius: var(--border-radius-md);
`;

const ToggleButton: SFC<
  HTMLAttributes<HTMLButtonElement> & { open?: boolean }
> = props => {
  return (
    <ToggleButtonStyle
      {...props}
      icon={
        <Icon
          name={props.open ? 'next-page' : 'three-dots-symbol'}
          rotation={props.open ? 180 : 0}
          color="var(--color-brand-dark)"
        />
      }
    />
  );
};

export default ToggleButton;
