import React, { useContext, useEffect, useRef, useState } from 'react';
import { useOnScreen } from './use-on-screen';

export const NavContext = React.createContext();

const NavProvider = ({ children }) => {
  const [activeNavLinkId, setActiveNavLinkId] = useState('');
  const providerValue = {
    activeNavLinkId,
    setActiveNavLinkId
  }

  return (
    <NavContext.Provider value={providerValue}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = navLinkId => {
  const ref = useRef(null);
  const { setActiveNavLinkId } = useContext(NavContext);
  const isOnScreen = useOnScreen(ref);

  useEffect(() => {
    if(isOnScreen) {
      setActiveNavLinkId(navLinkId);
    }
  }, [isOnScreen, setActiveNavLinkId, navLinkId]);

  return ref;
};