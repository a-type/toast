import React, { FC } from 'react';
import Link, { LinkProps } from '../../Link';
import { ListItem } from '@material-ui/core';

const SidebarLink: FC<LinkProps> = props => {
  return <ListItem button component={Link} color="inherit" {...props} />;
};

export default SidebarLink;
