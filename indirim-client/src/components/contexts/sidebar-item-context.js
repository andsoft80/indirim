import React from 'react';

const SidebarItemContext = React.createContext();

const {
  Provider: SidebarItemProvider,
  Consumer: SidebarItemConsumer
} = SidebarItemContext;

export {
  SidebarItemProvider,
  SidebarItemConsumer
};

export default SidebarItemContext;
