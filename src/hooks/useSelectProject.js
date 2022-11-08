import { useProjectContext } from './useProjectContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

const useSelectProject = () => {
  const { projectObject, setProjectObject } = useProjectContext();
  const { user } = useAuthContext();

  const selectProject = async (selectedProject) => {
    const documentRefNew = doc(db, 'users', user.uid);
    await updateDoc(documentRefNew, { selectedProjectId: selectedProject.id });
  };
  return { selectProject };
};

export default useSelectProject;
