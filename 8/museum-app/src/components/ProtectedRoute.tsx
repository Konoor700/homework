import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  type { RootState } from '../store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; 
}

const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  
  return <>{children}</>;
};

export default ProtectedRoute;
