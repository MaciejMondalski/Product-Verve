import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.scss';

// pages and components
import Initiatives from './pages/Initiatives';
import Create from './pages/Create';
import Login from './pages/Login';
import Project from './pages/project/Project';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';
import { useState } from 'react';
import { usePaginationContext } from './hooks/usePaginationContext';

function App() {
  const { user, authIsReady } = useAuthContext();
  const [createModal, setCreateModal] = useState(false);
  const { currentPage, setCurrentPage } = usePaginationContext();

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
                  <Route path={'initiatives/:pageId'} element={!user ? <Navigate to='/login' /> : <Initiatives />} />
                  <Route
                    exact
                    path='login'
                    element={user ? <Navigate to={`/initiatives/${'page-' + currentPage}`} /> : <Login />}
                  />
                  <Route
                    path='signup'
                    element={user ? <Navigate to={`/initiatives/${'page-' + currentPage}`} /> : <Signup />}
                  />
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
