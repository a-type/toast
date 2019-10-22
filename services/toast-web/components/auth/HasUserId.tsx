import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export interface HasUserIdProps {
  userId: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export const HasUserId: React.SFC<HasUserIdProps> = ({
  userId,
  children,
  fallback,
}) => {
  const state = useAuth();
  return (
    <>
      {state && state.user && state.user.uid !== userId ? children : fallback}
    </>
  );
};
