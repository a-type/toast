import * as React from 'react';
import { useAuth } from 'contexts/AuthContext';

interface IsAdminProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const IsAdmin: React.SFC<IsAdminProps> = ({
  children,
  fallback = null,
}) => {
  const ctx = useAuth();
  return <>{ctx.token.claims['admin'] ? children : fallback}</>;
};
