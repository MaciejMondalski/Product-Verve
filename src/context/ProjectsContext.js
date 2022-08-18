import { createContext, useReducer } from 'react';

export const ProjectsContext = createContext();

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

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, {
    view: 'grid',
  });

  console.log('ProjectsContext state:', state);

  return <ProjectsContext.Provider value={{ ...state, dispatch }}>{children}</ProjectsContext.Provider>;
};
