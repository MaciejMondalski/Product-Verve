import { useProjectContext } from './useProjectContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const useSelectProject = () => {
  const { projectObject, setProjectObject } = useProjectContext();

  const selectProject = async (selectedProject) => {
    console.log(projectObject);
    // update old selected status
    const documentRefOld = doc(db, 'projectGroups', projectObject.id);
    await updateDoc(documentRefOld, { selected: false });

    // update new selected status
    const documentRefNew = doc(db, 'projectGroups', selectedProject.id);
    await updateDoc(documentRefNew, { selected: true });

    // set new project state
  };
  return { selectProject };
};

export default useSelectProject;
