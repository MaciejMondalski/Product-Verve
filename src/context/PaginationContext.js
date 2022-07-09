import { createContext, useState } from 'react';

export const PaginationContext = createContext();

export const PaginationContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  console.log('PaginationContext state:', currentPage);

  return <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PaginationContext.Provider>;
};
