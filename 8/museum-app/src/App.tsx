import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './store/slices/userSlice';
import type { AppDispatch } from './store/store';


import { socket } from './store/api/socket';

import HomePage from './layout/HomePage';
import LoginPage from './layout/LoginPage';
import RegisterPage from './layout/RegisterPage';
import StripePage from './layout/StripePage';
import NewPost from './layout/NewPost';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(loginSuccess({ user, token }));
      } catch (e) {
        console.error("Failed to parse user from storage", e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

  

    
    socket.on('connect', () => {
      console.log('🟢 WebSocket connected! ID:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('🔴 WebSocket connection error:', err);
    });

   
    socket.on('notification', (data: any) => {
      console.log('🔔 Отримано сповіщення:', data);
      alert(`Нове сповіщення: ${JSON.stringify(data)}`);
    });

    
    return () => {
      socket.off('connect');
      socket.off('notification');
      socket.off('connect_error');
      
    };

  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StripePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/new-post" 
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;