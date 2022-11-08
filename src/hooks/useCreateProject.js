import { doc, setDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage, db } from '../firebase/config';

const useCreateProject = () => {
  const newProject = async (name, description, projectIcon) => {
    const project = {
      name,
      description,
      photoURL: '',
    };

    // Genereate a project ID
    const usersRef = collection(db, 'projectGroups'); // collectionRef
    const userRef = doc(usersRef); // docRef
    const generatedId = userRef.id; // a docRef has an id property

    console.log('generated project id: ', generatedId);

    // Upload project icon to storage
    const storageRef = ref(storage, `projectIcons/${generatedId}/${projectIcon.name}`);
    await uploadBytes(storageRef, projectIcon);
    const downloadUrl = await getDownloadURL(storageRef);

    const newProject = await setDoc(doc(db, 'projectGroups', generatedId), {
      projectName: name,
      description,
      photoURL: downloadUrl,
      selected: false,
    });
  };

  return { newProject };
};

export default useCreateProject;
