import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.scss';

// pages and components
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Login from './pages/Login';
import Project from './pages/project/Project';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';
import { useState } from 'react';

function App() {
  const { user, authIsReady } = useAuthContext();
  const [createModal, setCreateModal] = useState(false);

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar setCreateModal={setCreateModal} />}
          {createModal && <Create setCreateModal={setCreateModal} />}
          <div className='container'>
            <Navbar />
            <div className={user ? 'below-nav' : 'below-nav center-content'}>
              <div className='route-wrapper'>
                <Routes>
                  <Route path='dashboard' element={!user ? <Navigate to='/login' /> : <Dashboard />} />
                  <Route path='login' element={user ? <Navigate to='/dashboard' /> : <Login />} />
                  <Route path='signup' element={user ? <Navigate to='/dashboard' /> : <Signup />} />
                  <Route path='projects/:id' element={<Project />} />
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
