import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { getMyExhibits, type Exhibit } from '../store/api/exhibitActions';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import ControlBar from '../components/ControlBar';
import type { RootState } from '../store/store';

const HomePage = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    loadMyExhibits();
  }, [currentPage]);

  const loadMyExhibits = async () => {
    setLoading(true);
    try {
      const data = await getMyExhibits(currentPage, itemsPerPage);
      
      if (data && data.exhibits) {
        setExhibits(data.exhibits);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } else {
        setExhibits([]);
      }
    } catch (error) {
      console.error('Failed to load my exhibits:', error);
      setExhibits([]);
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-lg animate-pulse">Завантаження...</div>
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