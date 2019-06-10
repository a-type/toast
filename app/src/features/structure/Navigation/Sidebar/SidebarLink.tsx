import React, { FC } from 'react';
import Link, { LinkProps } from 'components/generic/Link';
import { ListItem } from '@material-ui/core';

const SidebarLink: FC<LinkProps> = props => {
  return (
    <li>
      <ListItem button component={Link} {...props} />
    </li>
  );
};

export default SidebarLink;
