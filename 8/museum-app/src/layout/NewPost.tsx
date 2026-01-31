import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExhibit } from '../store/api/exhibitActions';
import ControlBar from '../components/ControlBar';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !selectedFile) {
      setError('Всі поля (назва, опис, зображення) є обов\'язковими');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await createExhibit({
        title,
        description,
        image: selectedFile
      });

      navigate('/home');
    } catch (err: any) {
      console.error('Failed to create exhibit:', err);
      setError(err.response?.data?.message || 'Не вдалося створити пост. Перевірте формат файлу.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <ControlBar />
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
            Створити новий пост
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Назва посту
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введіть влучний заголовок..."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Опис посту
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Розкажіть історію цього експонату..."
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-y"
              />
            </div>

            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Зображення
              </label>
              
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                <div className="space-y-1 text-center">
                  {!previewUrl ? (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                          <span>Завантажити файл</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                        <p className="pl-1">або перетягніть сюди</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF до 10MB</p>
                    </>
                  ) : (
                    <div className="relative">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="mx-auto max-h-64 rounded-lg shadow-md object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setSelectedFile(null);
                        }}
                        className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium underline"
                      >
                        Видалити та вибрати інше
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700 animate-pulse">
                <p>{error}</p>
              </div>
            )}

            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 py-3 px-6 text-white font-semibold rounded-lg shadow-md transition-all duration-200
                  ${submitting 
                    ? 'bg-green-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-[0.98]'
                  }`}
              >
                {submitting ? 'Публікуємо...' : 'Опублікувати пост'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/home')}
                className="py-3 px-6 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm active:scale-[0.98]"
              >
                Скасувати
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;