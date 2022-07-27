import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { InitiativesContextProvider } from './context/InitiativesContext';
import { PaginationContextProvider } from './context/PaginationContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <InitiativesContextProvider>
        <PaginationContextProvider>
          <App />
        </PaginationContextProvider>
      </InitiativesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
