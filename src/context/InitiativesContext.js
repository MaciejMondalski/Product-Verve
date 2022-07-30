import { createContext, useReducer } from 'react';

export const InitiativesContext = createContext();

export const initiativesReducer = (state, action) => {
  switch (action.type) {
    case 'LIST':
      return { ...state, view: action.payload };
    case 'GRID':
      return { ...state, view: action.payload };
    default:
      return state;
  }
};

export const InitiativesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(initiativesReducer, {
    view: 'grid',
  });

  console.log('InitiativesContext state:', state);

  return <InitiativesContext.Provider value={{ ...state, dispatch }}>{children}</InitiativesContext.Provider>;
};
