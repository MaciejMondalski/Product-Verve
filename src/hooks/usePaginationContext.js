import { PaginationContext } from '../context/PaginationContext';
import { useContext } from 'react';

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw Error('usePaginationContext must be inside an PaginationContextProvider');
  }

  return context;
};
