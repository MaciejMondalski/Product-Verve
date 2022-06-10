import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {
  const [isCancelled, setSetIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    console.log('useLogin activated');
    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);

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

  return { login, error, isPending };
};
