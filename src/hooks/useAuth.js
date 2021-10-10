import { useLazyQuery, useMutation } from '@apollo/client';
import { gql } from 'graphql.macro';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { MAIN_USER_INFO } from '../fragments/MainUserInfo';

const AUTHENTICATE = gql`
  ${MAIN_USER_INFO}
  mutation authenticate($username: String, $password: String) {
    authenticate(username: $username, password: $password) {
      user {
        ...MainUserInfo
      }
      errors {
        text
      }
      authToken
    }
  }
`;

const ME = gql`
  ${MAIN_USER_INFO}
  query me {
    me {
      ...MainUserInfo
    }
  }
`;

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authToken'));
  let [loadMe, { loading }] = useLazyQuery(ME, {
    onCompleted(data) {
      setUser(data.me);
    },
  });

  useEffect(() => {
    if (!user && isAuthenticated) {
      loadMe();
    }
    return () => {};
  }, [loadMe, user, isAuthenticated]);

  const signIn = (username, password, { onError = () => {} }) => {
    return authenticate({ variables: { username: username, password: password } }).then(
      ({ data: { authenticate } }) => {
        if (authenticate.errors.length > 0) {
          onError(authenticate.errors);
        } else {
          localStorage.setItem('authToken', authenticate.authToken);
          localStorage.setItem('userId', authenticate.user.id);
          setUser(authenticate.user);
          setIsAuthenticated(true);
          return authenticate.user;
        }
      }
    );
  };
  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    window.location.replace('/');
  };

  let [authenticate] = useMutation(AUTHENTICATE);

  // Return the user object and auth methods
  return {
    user,
    signIn,
    signOut,
    isLoadingMe: loading,
    isAuthenticated,
  };
}
