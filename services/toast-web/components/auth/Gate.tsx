import React from 'react';
import { AuthContextValue, useAuth } from '../../contexts/AuthContext';

export interface AuthGateProps {
  condition(props: AuthContextValue): boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGate: React.SFC<AuthGateProps> = ({
  condition,
  children,
  fallback = null,
}) => {
  const state = useAuth();
  return <>{condition(state) ? children : fallback}</>;
};
