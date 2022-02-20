import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const browserDefaultDarkMode = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches === true;
}

const INITIAL_STATE = { darkMode: browserDefaultDarkMode() };

const themeReducer = (state, action) => {
  switch(action.type) {
    case 'TOGGLE':
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
}

export const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  return (
    <ThemeContext.Provider value={{state, dispatch}}>
      {props.children}
    </ThemeContext.Provider>
  )
}
