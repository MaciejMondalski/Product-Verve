import { createContext, useEffect, useReducer, useState } from 'react';
import { useCollection } from '../hooks/useCollection';

export const ProjectContext = createContext();

export const selectorReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT':
      return { ...state, project: action.payload };
    default:
      return state;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState();
  const [urlCurrentProject, setUrlCurrentProject] = useState();
  const { documents } = useCollection('projectGroups');
  const [state, dispatch] = useReducer(selectorReducer, {
    project: null,
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

  console.log('SelectorContext state:', state);

  return <ProjectContext.Provider value={{ ...state, dispatch }}>{children}</ProjectContext.Provider>;
};

//  const [currentProject, setCurrentProject] = useState();
//  const [urlCurrentProject, setUrlCurrentProject] = useState();
//  const [projectObject, setProjectObject] = useState();

//  useEffect(() => {
//    if (documents) {
//      const projectObj = documents[0];
//      const projectName = documents[0].projectName;
//      const urlProjectName = projectName.replace(/\s/g, '');
//      setCurrentProject(projectName);
//      setUrlCurrentProject(urlProjectName);
//      setProjectObject(projectObj);
//      console.log(projectObj);
//    }
//  }, [documents]);

//  return (
//    <ProjectContext.Provider
//      value={{ currentProject, setCurrentProject, urlCurrentProject, setUrlCurrentProject, projectObject }}
//    >
//      {children}
//    </ProjectContext.Provider>
//  );
//};
//
