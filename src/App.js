import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

// pages and components
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Login from './pages/Login';
import Project from './pages/Project';
import Signup from './pages/Signup';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/create' element={<Create />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='projects/:id' element={<Project />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
