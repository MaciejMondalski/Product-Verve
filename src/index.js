import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DashboardContextProvider } from './context/DashboardContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DashboardContextProvider>
        <App />
      </DashboardContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
