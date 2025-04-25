import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth0Context = createContext();

export const Auth0Provider = ({ children }) => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading, error } = useAuth0();

  const [auth0User, setAuth0User] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setAuth0User(user);
    }
  }, [isAuthenticated, user]);

  const login = () => loginWithRedirect();
  const signOut = () => logout({ returnTo: window.location.origin });

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        isLoading,
        user: auth0User,
        login,
        signOut,
        error,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export const useAuth0Context = () => useContext(Auth0Context);
