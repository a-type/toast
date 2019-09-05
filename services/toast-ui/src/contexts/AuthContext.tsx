import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'services/firebase';

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

export const AuthProvider = props => {
  const [authState, setAuthState] = useState<AuthContextValue>({
    user: null,
    token: null,
    isLoggedIn: undefined,
  });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      const token = user ? await user.getIdTokenResult() : null;

      setAuthState({
        user: user || null,
        token,
        isLoggedIn: !!user,
      });
    });
  }, []);

  return <AuthContext.Provider value={authState} {...props} />;
};
