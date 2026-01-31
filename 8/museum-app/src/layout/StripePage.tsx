import { useState, useEffect } from 'react';
import { getAllExhibits, type Exhibit } from '../store/api/exhibitActions';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import ControlBar from '../components/ControlBar';

const StripePage = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    loadExhibits();
  }, [currentPage]);

  const loadExhibits = async () => {
    setLoading(true);
    try {
      const data = await getAllExhibits(currentPage, itemsPerPage);
      
      
      if (data && data.exhibits) {
        setExhibits(data.exhibits);
        setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
      } else if (Array.isArray(data)) {
        setExhibits(data);
        setTotalPages(1);
      } else {
        setExhibits([]);
      }

    } catch (error) {
      console.error('Failed to load exhibits:', error);
      setExhibits([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ControlBar />
      
      
      <div className="container mx-auto max-w-3xl px-4 py-8">
        
       
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Всі пости</h1>
          <p className="text-gray-500 mt-1">Останні оновлення від усіх користувачів</p>
        </div>

        {loading ? (
          
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 text-lg font-medium animate-pulse">Завантаження стрічки...</p>
          </div>
        ) : (
          !exhibits || exhibits.length === 0 ? (
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Тут поки що тихо</h3>
              <p className="text-gray-500">
                Схоже, ще ніхто не створив жодного поста. Станьте першим!
              </p>
            </div>
          ) : (
           
            <div className="space-y-8">
              {exhibits.map(exhibit => (
                <Post 
                  key={exhibit.id} 
                  exhibit={exhibit}
                  isOwner={false} 
                />
              ))}

              {totalPages > 1 && (
                <div className="pt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StripePage;