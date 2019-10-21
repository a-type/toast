import React, { FC } from 'react';
import { logout } from 'lib/auth';
import { Button } from '@material-ui/core';
import { MeetingRoomTwoTone } from '@material-ui/icons';

export interface LogoutButtonProps {}

export const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  return (
    <Button onClick={logout}>
      <MeetingRoomTwoTone /> Log out
    </Button>
  );
};

export default LogoutButton;
