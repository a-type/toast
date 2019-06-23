import { Consumer } from '../TokenContext';
import React from 'react';

export interface HasUserIdProps {
  userId: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
}

const HasUserId: React.SFC<HasUserIdProps> = ({
  userId,
  children,
  fallback,
}) => (
  <Consumer>
    {state =>
      state && state.user && state.user.uid !== userId ? children : fallback
    }
  </Consumer>
);

export default HasUserId;
