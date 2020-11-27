import React from 'react';

const AuthServiceContext = React.createContext();

const {
  Provider: AuthServiceProvider,
  Consumer: AuthServiceConsumer
} = AuthServiceContext;

export {
  AuthServiceProvider,
  AuthServiceConsumer
};

export default AuthServiceContext;
