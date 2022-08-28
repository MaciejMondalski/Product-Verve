import { useEffect, useState, useRef } from 'react';

import { db } from '../firebase/config';

// firebase imports
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

export const useCollection = (c, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // Without a ref --> infinite loop in useEffect
  // _query is an array and is 'diffrent' on every function call

  const propsQuery = useRef(_query).current;
  const propsOrderBy = useRef(_orderBy).current;

  // .collection("projects")
  // .where("status", "==", "Done")

  // `${queryRef ? queryRef : ref}`

  useEffect(() => {
    let ref = collection(db, c);

    //  const q = query(ref, where(_query));
    if (propsQuery) {
      ref = query(ref, where(...propsQuery));
    }

    if (propsOrderBy) {
      ref = query(ref, orderBy(...propsOrderBy));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError('could not fetch the data');
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [c]);

  return { documents, error, _query };
};
