import { useSelector } from 'react-redux';
import type { Comment as CommentType } from '../store/api/commentActions';
import type { RootState } from '../store/store';

interface CommentProps {
  comment: CommentType;
  onDelete: (id: string) => void;
}

const Comment = ({ comment, onDelete }: CommentProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  

  const isOwner = user?.id === comment.userId;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA') + ' ' + date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="border border-gray-100 rounded-lg p-3 mb-3 bg-gray-50 hover:bg-white transition-colors">
      
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <strong className="text-sm text-gray-800">{comment.username}</strong>
          <span className="text-xs text-gray-400">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        
        {isOwner && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
            title="Видалити коментар"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="text-gray-700 text-sm whitespace-pre-wrap break-words">
        {comment.text}
      </div>
    </div>
  );
};

export default Comment;