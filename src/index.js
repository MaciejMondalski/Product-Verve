import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ProjectsContextProvider } from './context/ProjectsContext';
import { PaginationContextProvider } from './context/PaginationContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectsContextProvider>
        <PaginationContextProvider>
          <App />
        </PaginationContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
