import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.scss';

// pages and components
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Login from './pages/Login';
import Project from './pages/Project';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}

          <div className='container'>
            <Navbar />
            <div className={user ? 'below-nav' : 'below-nav center-content'}>
              <div className='route-wrapper'>
                <Routes>
                  <Route
                    path='/'
                    element={!user ? <Navigate to='/login' /> : <Dashboard />}
                  />
                  <Route
                    path='/create'
                    element={!user ? <Navigate to='/login' /> : <Create />}
                  />
                  <Route
                    path='login'
                    element={user ? <Navigate to='/' /> : <Login />}
                  />
                  <Route
                    path='signup'
                    element={user ? <Navigate to='/' /> : <Signup />}
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
