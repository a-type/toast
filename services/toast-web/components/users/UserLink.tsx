import React, { FC } from 'react';
import {
  makeStyles,
  Theme,
  Avatar,
  Typography,
  Button,
} from '@material-ui/core';
import Link from 'components/Link';

export interface UserLinkProps {
  user: {
    id: string;
    displayName: string;
    photoUrl: string;
  };
}

const useStyles = makeStyles<Theme, UserLinkProps>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

export const UserLink: FC<UserLinkProps> = props => {
  const classes = useStyles(props);
  const { user } = props;

  return (
    <Button
      variant="text"
      component={Link}
      to={`/users/${user.id}`}
      className={classes.root}
    >
      <Avatar src={user.photoUrl} className={classes.avatar} />
      <Typography>{user.displayName}</Typography>
    </Button>
  );
};
