import { auth, storage, db, provider } from '../firebase/config';
import { signInWithPopup, getAdditionalUserInfo, updateProfile } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';
import { ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useGoogleAuth = () => {
  const [isCancelled, setSetIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signInWithGoogle = async () => {
    console.log('useGoogleAuth activated');
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res.user.photoURL);

      if (!res) {
        throw new Error('Could not sign in with Google');
      }

      // Pass the UserCredential
      const { isNewUser } = getAdditionalUserInfo(res);
      console.log(isNewUser);

      if (isNewUser) {
        console.log("it's a new user!!!!!!!");
        // upload user thumbnail

        const storageRef = ref(storage, `thumbnails/${res.user.uid}/${res.user.photoURL}`);
        await uploadBytes(storageRef, res.user.photoURL);
        const displayName = res.user.displayName;

        // add display AND PHOTO_URL name to user
        //  await res.user.updateProfile({ displayName, photoURL });
        await updateProfile(res.user, { displayName, photoURL: res.user.photoURL });

        // create a user document
        await setDoc(doc(db, 'users', res.user.uid), {
          online: true,
          displayName,
          photoURL: res.user.photoURL,
        });

        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user });

        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      } else {
        console.log("it's an OLD user");
        // update online status
        const documentRef = doc(db, 'users', res.user.uid);
        await updateDoc(documentRef, { online: true });

        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user });

        // update state
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
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

  return { signInWithGoogle, error, isPending };
};
