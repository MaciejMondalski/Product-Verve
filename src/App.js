import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.scss';

// pages and components
import TasksPage from './pages/TasksPage';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Login from './pages/Login';
import Task from './pages/task/Task';
import ProjectsPage from './pages/ProjectsPage';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';
import { useState } from 'react';
import { usePaginationContext } from './hooks/usePaginationContext';
import { useCollection } from './hooks/useCollection';
import { useProjectContext } from './hooks/useProjectContext';
import CreateProject from './components/CreateProject';

function App() {
  const { user, authIsReady } = useAuthContext();
  const [createModal, setCreateModal] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const { currentPage } = usePaginationContext();
  const { urlCurrentProject } = useProjectContext();

  const { documents } = useCollection('projects');

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          {createModal && <Create setCreateModal={setCreateModal} projectsCollection={documents} />}
          {newProjectModal && <CreateProject setNewProjectModal={setNewProjectModal} />}
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
                    path={'/projects'}
                    element={
                      !user ? <Navigate to='/login' /> : <ProjectsPage setNewProjectModal={setNewProjectModal} />
                    }
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
                  <Route path={`${urlCurrentProject}/task/:id`} element={<Task />} />
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
