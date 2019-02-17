import { createContext } from 'react';

export interface AuthContextValue {
  user: firebase.User;
  token: firebase.auth.IdTokenResult;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextValue>(null);

export default AuthContext;
