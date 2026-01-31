import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { setNavigate } from './store/api/axiosInstance';


import StripePage from './layout/StripePage';
import HomePage from './layout/HomePage';
import LoginPage from './layout/LoginPage';
import RegisterPage from './layout/RegisterPage';
import NewPost from './layout/NewPost';


import ProtectedRoute from './components/ProtectedRoute';


function NavigationSetup() {
  const navigate = useNavigate();
  
  useEffect(() => {
    
    setNavigate(navigate);
  }, [navigate]);
  
  return null;
}

function App() {
  return (
    
    <Provider store={store}>
      <BrowserRouter>
      
        <NavigationSetup />
        
        
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#f5f5f5',
          fontFamily: 'Arial, sans-serif'
        }}>
          <Routes>
            
            <Route path="/" element={<StripePage />} />

            
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <LoginPage />
                </ProtectedRoute>
              } 
            />

           
            <Route 
              path="/register" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <RegisterPage />
                </ProtectedRoute>
              } 
            />

            
            <Route 
              path="/home" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <HomePage />
                </ProtectedRoute>
              } 
            />

            
            <Route 
              path="/new-post" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <NewPost />
                </ProtectedRoute>
              } 
            />

           
            <Route 
              path="*" 
              element={
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                  <h1>404 - Сторінка не знайдена</h1>
                  <a href="/">Повернутися на головну</a>
                </div>
              } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
