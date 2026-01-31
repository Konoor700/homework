import { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteExhibit } from '../store/api/exhibitActions';
import type { Exhibit } from '../store/api/exhibitActions';
import type { RootState } from '../store/store';
import CommentStripe from './CommentStripe';

interface PostProps {
  exhibit: Exhibit;
  onDelete?: () => void; 
  isOwner?: boolean; 
}

const Post = ({ exhibit, onDelete, isOwner = false }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  

  const { user } = useSelector((state: RootState) => state.user);

  const handleDelete = async () => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей пост?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteExhibit(exhibit.id);
      if (onDelete) {
        onDelete(); 
      }
    } catch (error) {
      console.error('Failed to delete exhibit:', error);
      alert('Не вдалося видалити пост');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8 transition-shadow duration-300 hover:shadow-xl">
      
      
      <div className="w-full bg-gray-100">
        <img 
          src={exhibit.imageUrl} 
          alt={exhibit.title || "Пост"}
          
          className="w-full h-64 sm:h-96 object-cover block"
        />
      </div>

      
      <div className="p-6">
        
        
        <div className="mb-4">
          {exhibit.title && (
            <h3 className="text-2xl font-bold text-gray-800 mb-1 leading-tight">
              {exhibit.title}
            </h3>
          )}
          
          {exhibit.username && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
               <span className="bg-gray-100 px-2 py-0.5 rounded-full font-medium text-gray-600">
                 @{exhibit.username}
               </span>
               <span>• Автор</span>
            </div>
          )}
        </div>
        
        
        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
          {exhibit.description}
        </p>
      </div>

      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        
        
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-blue-50"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {showComments ? 'Сховати' : 'Коментарі'}
        </button>

        
        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors px-3 py-1 rounded hover:bg-red-50 font-medium
              ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
           
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {isDeleting ? 'Видалення...' : 'Видалити'}
          </button>
        )}
      </div>

      
      {showComments && (
        <div className="bg-gray-50 px-6 pb-6 border-t border-gray-200 animate-fadeIn">
          <div className="pt-4">
             <CommentStripe exhibitId={exhibit.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;