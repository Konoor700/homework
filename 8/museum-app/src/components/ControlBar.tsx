import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../store/store';
import { logout } from '../store/slices/userSlice';

const ControlBar = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="bg-gray-900 text-white shadow-md sticky top-0 z-50 mb-8">
      
  
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Posts App
          </Link>
        </div>

        
        <nav className="flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            Всі пости
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/home" className="hover:text-gray-300 transition-colors">
                Мої пости
              </Link>
              
             
              <Link 
                to="/new-post" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
              >
                + Новий пост
              </Link>

              
              <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
                <span className="text-gray-400 text-sm hidden sm:inline">
                  Привіт, <span className="text-white">{user?.username}</span>
                </span>
                
              
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                >
                  Вийти
                </button>
              </div>
            </>
          ) : (
            
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-white text-gray-300 transition-colors">
                Вхід
              </Link>
              <Link 
                to="/register" 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Реєстрація
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default ControlBar;