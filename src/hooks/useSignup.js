import { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { useAuthContext } from '../hooks/useAuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useSignup = () => {
  const [isCancelled, setSetIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // upload user thumbnail
      const storageRef = ref(storage, `thumbnails/${res.user.uid}/${thumbnail.name}`);
      await uploadBytes(storageRef, thumbnail);
      const downloadUrl = await getDownloadURL(storageRef);

      // add display AND PHOTO_URL name to user
      await updateProfile(res.user, { displayName, photoURL: downloadUrl });

      // Add a new document in collection "users"
      await setDoc(doc(db, 'users', res.user.uid), {
        online: true,
        displayName,
        photoURL: downloadUrl,
        selectedProjectId: '',
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      setSetIsCancelled(true);
    };
  }, []);

  return { signup, error, isPending };
};
