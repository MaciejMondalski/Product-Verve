import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.scss';

// pages and components
import TasksPage from './pages/TasksPage';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Login from './pages/Login';
import Project from './pages/project/Project';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';
import { useState } from 'react';
import { usePaginationContext } from './hooks/usePaginationContext';
import { useCollection } from './hooks/useCollection';
import { useProjectContext } from './hooks/useProjectContext';

function App() {
  const { user, authIsReady } = useAuthContext();
  const [createModal, setCreateModal] = useState(false);
  const { currentPage, setCurrentPage } = usePaginationContext();
  const { currentProject, setCurrentProject, urlCurrentProject } = useProjectContext();

  const { documents } = useCollection('projects');

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          {createModal && <Create setCreateModal={setCreateModal} projectsCollection={documents} />}
          <div className='container'>
            <Navbar setCreateModal={setCreateModal} />
            <div className={user ? 'below-nav' : 'below-nav center-content'}>
              <div className='route-wrapper'>
                <Routes>
                  <Route
                    path={`${urlCurrentProject}/tasks/:pageId`}
                    element={!user ? <Navigate to='/login' /> : <TasksPage />}
                  />
                  <Route
                    path={`${urlCurrentProject}/dashboard`}
                    element={!user ? <Navigate to='/login' /> : <Dashboard />}
                  />
                  <Route
                    exact
                    path='login'
                    element={
                      user ? <Navigate to={`/${urlCurrentProject}/tasks/${'page-' + currentPage}`} /> : <Login />
                    }
                  />
                  <Route
                    path='signup'
                    element={
                      user ? <Navigate to={`/${urlCurrentProject}/tasks/${'page-' + currentPage}`} /> : <Signup />
                    }
                  />
                  <Route path={`${urlCurrentProject}/task/:id`} element={<Project />} />
                </Routes>
              </div>
              {user && <UserList />}
            </div>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
