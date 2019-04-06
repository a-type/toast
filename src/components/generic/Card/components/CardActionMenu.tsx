import React, { FC } from 'react';
import styled from 'styled-components';
import { DropButton, Box } from 'grommet';
import Icon from 'components/generic/Icon';

const Positioner = styled.div`
  position: absolute;
  right: var(--spacing-md);
  bottom: var(--spacing-md);
`;

export interface CardActionMenuProps {}

export const CardActionMenu: FC<CardActionMenuProps> = ({ children }) => {
  return (
    <Positioner>
      <DropButton
        icon={<Icon name="three-dots-symbol" />}
        dropContent={<Box pad="large">{children}</Box>}
      />
    </Positioner>
  );
};

export default CardActionMenu;
