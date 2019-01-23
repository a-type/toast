import * as React from 'react';
import auth from 'services/auth';

export interface LoginProps {
  returnTo?: string;
}

const Login: React.SFC<LoginProps> = ({ returnTo }) => {
  React.useEffect(
    () => {
      auth.login({ returnTo });
    },
    [
      /* only on mount */
    ],
  );

  return <div>Redirecting...</div>;
};

export default Login;
