import { useState, useEffect, useRef } from 'react';
import { deleteExhibit } from '../store/api/exhibitActions';
import type { Exhibit } from '../store/api/exhibitActions';
import CommentStripe from './CommentStripe';
import ConfirmModal from './ConfirmModal'; 

interface PostProps {
  exhibit: Exhibit;
  onDelete?: () => void; 
  isOwner?: boolean; 
}

const Post = ({ exhibit, onDelete, isOwner = false }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  
  const confirmDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteExhibit(exhibit.id);
      if (onDelete) onDelete();

      if (isMounted.current) setIsModalOpen(false);
    } catch (err) {
      if (isMounted.current) {
        setError('Не вдалося видалити пост.');
        setIsDeleting(false);
        setIsModalOpen(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8 transition-shadow duration-300 hover:shadow-xl">
      <div className="w-full bg-gray-100">
        <img src={exhibit.imageUrl} alt="Пост" className="w-full h-64 sm:h-96 object-cover block" />
      </div>

      <div className="p-6">
        <div className="mb-4 text-sm text-gray-500">
          {exhibit.username && <span>@{exhibit.username}</span>}
        </div>

        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
          {exhibit.description}
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
            {error}
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <button 
          onClick={() => setShowComments(!showComments)} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          <span>💬</span> {showComments ? 'Сховати' : 'Коментарі'}
        </button>

        {isOwner && (
          <button 
            onClick={() => setIsModalOpen(true)} // ✅ Просто відкриваємо модалку
            className="text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Видалити
          </button>
        )}
      </div>

      {showComments && (
        <div className="bg-gray-50 px-6 pb-6 border-t border-gray-200">
          <div className="pt-4">
            <CommentStripe exhibitId={exhibit.id} />
          </div>
        </div>
      )}

    
      <ConfirmModal
        isOpen={isModalOpen}
        title="Видалити пост?"
        message="Цю дію неможливо буде скасувати. Ви впевнені?"
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Post;