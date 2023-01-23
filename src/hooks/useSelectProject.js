import { useProjectContext } from './useProjectContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { useCollection } from '../hooks/useCollection';
import { useEffect } from 'react';

//useEffect(() => {
//  const loggedInUser = documents && documents.filter((document) => document.id.includes(user.uid));
//  //console.log(loggedInUser[0].selectedProjectId);
//  loggedInUser && setProjectObject(loggedInUser[0].selectedProjectId);
//});

const useSelectProject = () => {
  const { projectObject, setProjectObject } = useProjectContext('dwewefrwe');
  const { user } = useAuthContext();
  const { documents, error } = useCollection('users');

  // const initialProject = loggedInUser && loggedInUser.selectedProjectId;

  //initialProject && console.log(initialProject);

  const selectProject = async (selectedProject) => {
    const documentRefNew = doc(db, 'users', user.uid);
    await updateDoc(documentRefNew, { selectedProjectId: selectedProject.id });
  };

  return { selectProject };
};

export default useSelectProject;
