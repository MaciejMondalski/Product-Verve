import { DashboardContext } from '../context/DashboardContext';
import { useContext } from 'react';

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw Error('useDashboardContext must be inside an DashboardContextProvider');
  }

  return context;
};
