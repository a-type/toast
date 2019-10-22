import * as React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface IsLoggedInProps {
  fallback?: React.ReactNode;
}

export const IsLoggedIn: React.SFC<IsLoggedInProps> = ({
  children,
  fallback = null,
}) => {
  const state = useAuth();

  return <>{state.isLoggedIn ? children : fallback}</>;
};
