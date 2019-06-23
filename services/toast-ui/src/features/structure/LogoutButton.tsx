import React, { FC } from 'react';
import browserHistory from 'browserHistory';
import firebase from 'services/firebase';
import { Icon } from 'components/generic/Icon';
import { Button } from '@material-ui/core';

export interface LogoutButtonProps {}

export const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  return (
    <Button
      onClick={async () => {
        await firebase.auth().signOut();
        browserHistory.push('/');
      }}
    >
      <Icon name="meeting_room" /> Log out
    </Button>
  );
};

export default LogoutButton;
