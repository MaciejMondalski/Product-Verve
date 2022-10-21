import { useProjectContext } from './useProjectContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const useSelectProject = () => {
  const { dispatch } = useProjectContext();

  const selectProject = async (selectedProject, project) => {
    // update old selected status
    if (project) {
      const documentRefOld = doc(db, 'projectGroups', project.id);
      await updateDoc(documentRefOld, { selected: false });
    }

    // update new selected status
    const documentRefNew = doc(db, 'projectGroups', selectedProject.id);
    await updateDoc(documentRefNew, { selected: true });

    // dispatch login action
    dispatch({ type: 'SELECT', payload: selectedProject });
  };
  return { selectProject };
};

export default useSelectProject;
