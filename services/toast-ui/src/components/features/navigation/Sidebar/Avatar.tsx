import React from 'react';
import styled from 'styled-components';
import { AccountCircleTwoTone } from '@material-ui/icons';
import { Avatar as MuiAvatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarUrl: string;
}

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '16px',
  },
  avatar: {
    width: '24px',
    height: '24px',
  },
}));

const Avatar = React.forwardRef(
  ({ onClick, avatarUrl, ...rest }: AvatarProps, ref) => {
    const classes = useStyles({});
    return (
      <MuiAvatar src={avatarUrl} className={classes.avatar}>
        {!avatarUrl && <AccountCircleTwoTone className={classes.icon} />}
      </MuiAvatar>
    );
  },
);

export default Avatar;
