import { createContext, useEffect, useReducer, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const { documents } = useCollection('projectGroups');
  const { documents: users } = useCollection('users');
  const { user } = useAuthContext();

  const [projectObject, setProjectObject] = useState();
  const [urlCurrentProject, setUrlCurrentProject] = useState();

  useEffect(() => {
    const pickUser = async () => {
      const userSelection = user && users && users.filter((currentUser) => currentUser.id == user.uid);

      const userObject = (await userSelection) && userSelection.map((user) => user)[0];

      const selectedProject =
        userObject && documents && documents.filter((project) => project.id == userObject.selectedProjectId)[0];

      setProjectObject(selectedProject);
    };

    pickUser();
  }, [documents, users]);

  useEffect(() => {
    projectObject && setUrlCurrentProject(projectObject.projectName.replace(/\s/g, ''));
    console.log(projectObject);
  }, [projectObject]);

  return (
    <ProjectContext.Provider value={{ projectObject, setProjectObject, urlCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
