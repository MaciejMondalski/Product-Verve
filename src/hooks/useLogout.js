import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogout = () => {
  const [isCancelled, setSetIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    console.log('useLogout was activated');

    try {
      //update online status
      const { uid } = user;
      const ref = doc(db, 'users', uid);
      await updateDoc(ref, {
        online: false,
      });

      //sign the user out
      await signOut(auth);

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
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

  return { logout, error, isPending };
};
