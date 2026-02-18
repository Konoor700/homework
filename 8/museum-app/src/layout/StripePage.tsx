import { useState, useEffect, useCallback } from 'react'; // Видалено useRef
import { getAllExhibits, type Exhibit } from '../store/api/exhibitActions';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import ControlBar from '../components/ControlBar';
import { ITEMS_PER_PAGE } from '../utils/constants';

const StripePage = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExhibits = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllExhibits(currentPage, ITEMS_PER_PAGE, signal);
      setExhibits(data.exhibits || []);
      setTotalPages(Math.ceil((data.total || 0) / ITEMS_PER_PAGE));
    } catch (err: any) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
      setError(err.response?.data?.message || 'Не вдалося завантажити стрічку.');
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    const controller = new AbortController();
    loadExhibits(controller.signal);
    return () => controller.abort();
  }, [loadExhibits]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ControlBar />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Всі пости</h1>
        {loading ? <div className="py-20 text-center animate-pulse text-gray-500">Завантаження...</div> : 
         error ? <div className="text-center text-red-600 py-10">{error}</div> :
         <div className="space-y-8">
           {exhibits.map(exhibit => <Post key={exhibit.id} exhibit={exhibit} />)}
           {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
         </div>
        }
      </div>
    </div>
  );
};

export default StripePage;