import { ViewContext } from '../context/ViewContext';
import { useContext } from 'react';

export const useViewContext = () => {
  const context = useContext(ViewContext);

  if (!context) {
    throw Error('useViewContext must be inside an ViewContextProvider');
  }

  return context;
};
