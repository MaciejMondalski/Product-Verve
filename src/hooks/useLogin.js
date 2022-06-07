import { signInWithEmailAndPassword } from 'firebase/auth';
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

    // login user
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user });
      })
      .then((res) => {
        db.collection('users').doc(res.user.uid).update({ online: true });
      })
      .catch((err) => {
        if (!isCancelled) {
          console.log(err.message);
          setError(err.message);
          setIsPending(false);
        }
      });

    // update online status

    // update state
  };

  useEffect(() => {
    return () => {
      setSetIsCancelled(true);
    };
  }, []);

  return { login, error, isPending };
};
