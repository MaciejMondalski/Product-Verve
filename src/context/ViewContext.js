import { createContext, useReducer } from 'react';

export const ViewContext = createContext();

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case 'LIST':
      return { ...state, view: action.payload };
    case 'GRID':
      return { ...state, view: action.payload };
    case 'BOARD':
      return { ...state, view: action.payload };
    default:
      return state;
  }
};

export const ViewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, {
    view: 'grid',
  });

  console.log('ViewContext state:', state);

  return <ViewContext.Provider value={{ ...state, dispatch }}>{children}</ViewContext.Provider>;
};
