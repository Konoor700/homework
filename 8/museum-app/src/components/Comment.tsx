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
    return date.toLocaleDateString('uk-UA') + ' ' + date.toLocaleTimeString('uk-UA');
  };

  return (
    <div style={{ 
      border: '1px solid #eee',
      borderRadius: '4px',
      padding: '12px',
      marginBottom: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <div>
          <strong>{comment.username}</strong>
          <span style={{ color: '#999', fontSize: '12px', marginLeft: '10px' }}>
            {formatDate(comment.createdAt)}
          </span>
        </div>
        
        
        {isOwner && (
          <button
            onClick={() => onDelete(comment.id)}
            style={{
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
            title="Видалити коментар"
          >
            x
          </button>
        )}
      </div>

      <div style={{ color: '#333' }}>
        {comment.text}
      </div>
    </div>
  );
};

export default Comment;