import React from 'react';

const { 
  Provider: LoginServiceProvider,
  Consumer: LoginServiceConsumer,
  } = React.createContext();

export { LoginServiceConsumer, LoginServiceProvider };