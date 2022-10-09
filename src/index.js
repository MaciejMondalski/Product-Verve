import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ViewContextProvider } from './context/ViewContext';
import { PaginationContextProvider } from './context/PaginationContext';
import { ProjectContextProvider } from './context/ProjectContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectContextProvider>
        <ViewContextProvider>
          <PaginationContextProvider>
            <App />
          </PaginationContextProvider>
        </ViewContextProvider>
      </ProjectContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
