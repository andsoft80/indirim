import React from 'react';

const AccountServiceContext = React.createContext();

const {
  Provider: AccountServiceProvider,
  Consumer: AccountServiceConsumer
} = AccountServiceContext;

export {
  AccountServiceProvider,
  AccountServiceConsumer
};

export default AccountServiceContext;
