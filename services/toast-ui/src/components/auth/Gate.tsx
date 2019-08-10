import { Consumer, AuthContext } from '../TokenContext';
import React from 'react';

export interface AuthGateProps {
  condition(props: AuthContext): boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGate: React.SFC<AuthGateProps> = ({
  condition,
  children,
  fallback = null,
}) => <Consumer>{state => (condition(state) ? children : fallback)}</Consumer>;
