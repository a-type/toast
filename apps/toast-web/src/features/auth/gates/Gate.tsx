import { Consumer } from '../TokenContext';
import React from 'react';
import { AuthUser } from 'services/auth/types';

export interface AuthGateProps {
  condition(props: {
    user: AuthUser;
    hasScope(scope: string): boolean;
    isLoggedIn: boolean;
  }): boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AuthGate: React.SFC<AuthGateProps> = ({
  condition,
  children,
  fallback = null,
}) => <Consumer>{state => (condition(state) ? children : fallback)}</Consumer>;

export default AuthGate;
