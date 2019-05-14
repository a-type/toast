import React, { FC } from 'react';
import browserHistory from 'browserHistory';
import firebase from 'services/firebase';
import { Button } from 'grommet';
import { Icon } from 'components/generic';

export interface LogoutButtonProps {}

export const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  return (
    <Button
      label="Log out"
      icon={<Icon name="meeting_room" />}
      onClick={async () => {
        await firebase.auth().signOut();
        browserHistory.push('/');
      }}
    />
  );
};

export default LogoutButton;
