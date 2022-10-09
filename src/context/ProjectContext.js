import { createContext, useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const { documents, error } = useCollection('projectGroups');
  const [currentProject, setCurrentProject] = useState();

  useEffect(() => {
    if (documents) {
      const projectName = documents[0].projectName;
      setCurrentProject(projectName);
    }
  }, [documents]);

  console.log('ProjectContext state:', currentProject);

  return <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>{children}</ProjectContext.Provider>;
};
