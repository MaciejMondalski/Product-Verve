import { createContext, useReducer } from 'react';

export const DashboardContext = createContext();

export const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'LIST':
      return { ...state, view: action.payload };
    case 'CARD':
      return { ...state, view: action.payload };
    default:
      return state;
  }
};

export const DashboardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    view: 'card',
  });

  console.log('DashboardContext state:', state);

  return <DashboardContext.Provider value={{ ...state, dispatch }}>{children}</DashboardContext.Provider>;
};
