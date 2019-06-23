import * as React from 'react';
import { Consumer } from '../TokenContext';

interface IsAdminProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const IsAdmin: React.SFC<IsAdminProps> = ({ children, fallback = null }) => (
  <Consumer>
    {ctx => (ctx && ctx.token.claims['admin'] ? children : fallback)}
  </Consumer>
);

export default IsAdmin;
