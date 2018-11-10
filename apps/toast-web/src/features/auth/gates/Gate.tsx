import { Consumer } from '../TokenContext';
import React from 'react';
import { AuthUser } from 'services/auth';

export interface AuthGateProps {
  condition(props: {
    user: AuthUser;
    scopes: string[];
    isLoggedIn: boolean;
  }): boolean;
  children: React.ReactNode;
  fallback: React.ReactNode;
}

const AuthGate: React.SFC<AuthGateProps> = ({
  condition,
  children,
  fallback,
}) => <Consumer>{state => (condition(state) ? children : fallback)}</Consumer>;

export default AuthGate;
