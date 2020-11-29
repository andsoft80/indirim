import React from 'react';

const UniversalServiceContext = React.createContext();

const {
  Provider: UniversalServiceProvider,
  Consumer: UniversalServiceConsumer
} = UniversalServiceContext;

export {
  UniversalServiceProvider,
  UniversalServiceConsumer
};

export default UniversalServiceContext;
