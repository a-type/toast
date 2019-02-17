import React, { SFC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { BackdropArt } from 'components/brand';
import { Icon } from 'components/generic';
import { Button } from 'grommet';

const ToggleButtonStyle = styled(Button)`
  position: fixed;
  left: var(--spacing-md);
  bottom: var(--spacing-md);
  border: 2px solid var(--color-brand);
  border-radius: var(--border-radius-md);
  background: var(--color-brand);
  color: var(--color-brand-dark);
  z-index: 10;
  padding: 5px 11px;
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
        />
      }
    />
  );
};

export default ToggleButton;
