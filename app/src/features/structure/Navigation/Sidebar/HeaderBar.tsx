import React, { SFC } from 'react';
import styled from 'styled-components';
import { Icon, Link } from 'components/generic';
import { Button, Box, BoxProps } from 'grommet';
import { BackdropArt, Logo } from 'components/brand';

const ToggleButtonStyle = styled(Button)`
  position: relative;
  border: 2px solid var(--color-brand);
  border-radius: var(--border-radius-md);
  background: var(--color-brand);
  color: var(--color-brand-dark);
  z-index: 10;
  padding: 5px 11px;
`;

const RelativeBox = styled(Box)`
  position: relative;
  height: 48px;
`;

const HeaderBar: SFC<BoxProps & { open?: boolean; onClick(): void }> = ({
  open,
  onClick,
  ...props
}) => {
  return (
    <RelativeBox {...props} direction="row" align="center" justify="start">
      <BackdropArt />
      <ToggleButtonStyle
        onClick={onClick}
        icon={
          <Icon
            name={open ? 'arrow_forward_ios' : 'more_vert'}
            rotation={open ? 180 : 0}
            size="24px"
          />
        }
      />
      <Link to="/">
        <Logo size="24px" />
      </Link>
    </RelativeBox>
  );
};

export default HeaderBar;
