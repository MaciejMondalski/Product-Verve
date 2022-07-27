import { InitiativesContext } from '../context/InitiativesContext';
import { useContext } from 'react';

export const useInitiativesContext = () => {
  const context = useContext(InitiativesContext);

  if (!context) {
    throw Error('useInitiativesContext must be inside an InitiativesContextProvider');
  }

  return context;
};
