import { createContext, useEffect, useReducer, useState } from 'react';
import { useCollection } from '../hooks/useCollection';

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const { documents } = useCollection('projectGroups');

  const [projectObject, setProjectObject] = useState();
  const [urlCurrentProject, setUrlCurrentProject] = useState();

  useEffect(() => {
    const selectedProject = documents && documents.filter((project) => project.selected == true)[0];
    console.log(selectedProject);

    setProjectObject(selectedProject);
  }, [documents]);

  useEffect(() => {
    projectObject && setUrlCurrentProject(projectObject.projectName.replace(/\s/g, ''));
    console.log(urlCurrentProject);
  }, [projectObject]);

  return (
    <ProjectContext.Provider value={{ projectObject, setProjectObject, urlCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
