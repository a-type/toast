import { createContext, useContext } from 'react';

export interface AuthContextValue {
  user: firebase.User;
  token: firebase.auth.IdTokenResult;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextValue>(null);

export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
