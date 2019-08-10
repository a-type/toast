import * as React from 'react';
import { TokenConsumer } from 'contexts/TokenContext';

interface IsAdminProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const IsAdmin: React.SFC<IsAdminProps> = ({
  children,
  fallback = null,
}) => (
  <TokenConsumer>
    {ctx => (ctx && ctx.token.claims['admin'] ? children : fallback)}
  </TokenConsumer>
);
