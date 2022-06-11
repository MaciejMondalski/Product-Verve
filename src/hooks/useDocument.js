import { doc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

export function useDocument(c, id) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    // const ref = collection(db, c);

    const ref = doc(db, c, id);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError('there is no such document');
        }
      },
      (err) => {
        console.log(err.message);
        setError('failed to get document');
      }
    );

    return () => unsubscribe();
  }, [c, id]);

  return { document, error };
}

// if (snapshot.data()) {
//   setDocument({ ...snapshot.data(), id: snapshot.id });
//   setError(null);
// } else {
//   setError('there is no such document');
// }
// },
// (err) => {
// console.log(err.message);
// setError('failed to get document');
// }

//if (snapshot) {
// console.log(snapshot.data().name);
// console.log(snapshot.docs[0].data());
//}
