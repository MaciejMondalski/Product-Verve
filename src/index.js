import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ViewContextProvider } from './context/ViewContext';
import { PaginationContextProvider } from './context/PaginationContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ViewContextProvider>
        <PaginationContextProvider>
          <App />
        </PaginationContextProvider>
      </ViewContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
