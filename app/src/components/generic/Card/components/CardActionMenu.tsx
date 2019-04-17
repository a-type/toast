import React, { FC } from 'react';
import styled from 'styled-components';
import { DropButton, Box, ButtonProps } from 'grommet';
import Icon from 'components/generic/Icon';

const SpacedBox = styled(Box)`
  & > * + * {
    margin-top: var(--spacing-md);
  }
`;

export interface CardActionMenuProps extends Partial<ButtonProps> {}

export const CardActionMenu: FC<CardActionMenuProps> = ({
  children,
  ...rest
}) => {
  return (
    <DropButton
      {...{ className: 'card-action-menu' } as any}
      icon={<Icon name="more_vert" />}
      dropProps={{
        plain: true,
        style: {
          boxShadow: '0 2px 8px 0 var(--color-shadow)',
          borderRadius: 'var(--border-radius-lg)',
        },
      }}
      dropContent={
        <SpacedBox background="light-2" className="neutral-content" pad="large">
          {children}
        </SpacedBox>
      }
      {...rest}
    />
  );
};

export default CardActionMenu;
