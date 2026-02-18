import { useState, useEffect, useCallback } from 'react'; 
import { useSelector } from 'react-redux';
import { getComments, addComment, deleteComment } from '../store/api/commentActions';
import type { Comment as CommentType } from '../store/api/commentActions';
import type { RootState } from '../store/store';
import Comment from './Comment';

interface CommentStripeProps {
  exhibitId: string;
}

const CommentStripe = ({ exhibitId }: CommentStripeProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { isAuthenticated } = useSelector((state: RootState) => state.user);


  const loadComments = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    try {
   
      const data = await getComments(exhibitId);
      setComments(data);
    } catch (error: any) {
      if (error.name !== 'CanceledError') {
        console.error('Failed to load comments:', error);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [exhibitId]);


  useEffect(() => {
    const controller = new AbortController();
    
    loadComments(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadComments]); 

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCommentText.trim()) {
      return;
    }

    if (newCommentText.length > 2000) {
      alert('Коментар занадто довгий (максимум 2000 символів)');
      return;
    }

    setSubmitting(true);
    try {
      const newComment = await addComment(exhibitId, newCommentText);
      
      setComments([newComment, ...comments]); 
      setNewCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Не вдалося додати коментар');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей коментар?')) {
      return;
    }

    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId)); 
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('Не вдалося видалити коментар');
    }
  };

  return (
    <div>
      <h4>Коментарі ({comments.length})</h4>

      {isAuthenticated && (
        <form onSubmit={handleAddComment} style={{ marginBottom: '20px' }}>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Додайте коментар..."
            maxLength={2000}
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              resize: 'vertical'
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px'
          }}>
            <span style={{ color: '#999', fontSize: '12px' }}>
              {newCommentText.length}/2000 символів
            </span>
            <button
              type="submit"
              disabled={submitting || !newCommentText.trim()}
              style={{
                padding: '8px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: submitting || !newCommentText.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              {submitting ? 'Відправка...' : 'Додати коментар'}
            </button>
          </div>
        </form>
      )}

      {!isAuthenticated && (
        <p style={{ color: '#999', fontStyle: 'italic', marginBottom: '20px' }}>
          Увійдіть, щоб залишити коментар
        </p>
      )}

      {loading ? (
        <p>Завантаження коментарів...</p>
      ) : comments.length === 0 ? (
        <p style={{ color: '#999', fontStyle: 'italic' }}>Коментарів поки немає</p>
      ) : (
        <div>
          {comments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentStripe;