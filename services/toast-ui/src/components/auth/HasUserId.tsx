import { TokenConsumer } from 'contexts/TokenContext';
import React from 'react';

export interface HasUserIdProps {
  userId: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export const HasUserId: React.SFC<HasUserIdProps> = ({
  userId,
  children,
  fallback,
}) => (
  <TokenConsumer>
    {state =>
      state && state.user && state.user.uid !== userId ? children : fallback
    }
  </TokenConsumer>
);
