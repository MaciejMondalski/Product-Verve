import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DashboardContextProvider } from './context/DashboardContext';
import { PaginationContextProvider } from './context/PaginationContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DashboardContextProvider>
        <PaginationContextProvider>
          <App />
        </PaginationContextProvider>
      </DashboardContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
