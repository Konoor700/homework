import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { getMyExhibits, type Exhibit } from '../store/api/exhibitActions';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import ControlBar from '../components/ControlBar';
import type { RootState } from '../store/store';
import { ITEMS_PER_PAGE } from '../utils/constants'; 

const HomePage = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  
  
  const { user } = useSelector((state: RootState) => state.user);

  
  const loadMyExhibits = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getMyExhibits(currentPage, ITEMS_PER_PAGE, signal);
      
      setExhibits(data.exhibits || []);
      setTotalPages(Math.ceil((data.total || 0) / ITEMS_PER_PAGE));

    } catch (err: any) {
     
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;

      console.error('Failed to load my exhibits:', err);
      setExhibits([]);
      
      const errorMessage = err.response?.data?.message || 'Не вдалося завантажити ваші пости.';
      setError(errorMessage); 
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [currentPage]);

  
  useEffect(() => {
    const controller = new AbortController();
    loadMyExhibits(controller.signal);
    return () => controller.abort();
  }, [loadMyExhibits]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostDeleted = () => {
    loadMyExhibits(); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ControlBar />
      
      <div className="container mx-auto max-w-3xl px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Мої пости</h1>
          <p className="text-gray-600">
            Привіт, <span className="font-semibold text-gray-800">{user?.username}</span>! Тут зібрані ваші пости.
          </p>
        </div>

        
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-xl text-center mb-6">
            <h3 className="font-bold text-lg mb-1">Ой, щось пішло не так</h3>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => loadMyExhibits()} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Спробувати ще раз
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-2"></div>
          </div>
        ) : exhibits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 text-lg mb-6">
              У вас ще немає жодного поста. Поділіться чимось цікавим!
            </p>
            <Link 
              to="/new-post"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm"
            >
              <span>+</span> Створити перший пост
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {exhibits.map(exhibit => (
              <Post 
                key={exhibit.id} 
                exhibit={exhibit}
                isOwner={true} 
                onDelete={handlePostDeleted}
              />
            ))}

            {totalPages > 1 && (
              <div className="pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;