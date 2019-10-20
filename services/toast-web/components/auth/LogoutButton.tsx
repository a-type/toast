import React, { FC } from 'react';
import browserHistory from 'browserHistory';
import firebase from 'services/firebase';
import { Button } from '@material-ui/core';
import { MeetingRoomTwoTone } from '@material-ui/icons';

export interface LogoutButtonProps {}

export const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  return (
    <Button
      onClick={async () => {
        await firebase.auth().signOut();
        browserHistory.push('/');
      }}
    >
      <MeetingRoomTwoTone /> Log out
    </Button>
  );
};

export default LogoutButton;
