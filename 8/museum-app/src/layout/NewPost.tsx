import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createExhibit } from '../store/api/exhibitActions';
import ControlBar from '../components/ControlBar';

const NewPost = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  
  const validationSchema = Yup.object({
    title: Yup.string().required("Заголовок обов'язковий"),
    description: Yup.string().required("Опис обов'язковий"),
    image: Yup.mixed().required("Зображення обов'язкове"),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: null as File | null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!values.image) return; 

      setServerError('');
      try {
        await createExhibit({
          title: values.title,
          description: values.description,
          image: values.image,
        });
        navigate('/home');
      } catch (err: any) {
        console.error('Failed to create exhibit:', err);
        setServerError(err.response?.data?.message || 'Не вдалося створити пост');
      } finally {
        setSubmitting(false);
      }
    },
  });

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      formik.setFieldValue('image', file);
      
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClearFile = () => {
    setPreviewUrl(null);
    formik.setFieldValue('image', null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <ControlBar />
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
            Створити новий пост
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Назва посту
              </label>
              <input
                type="text"
                {...formik.getFieldProps('title')}
                placeholder="Введіть влучний заголовок..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200
                  ${formik.touched.title && formik.errors.title
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-green-500 focus:border-transparent'}`}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.title}</p>
              )}
            </div>

           
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Опис посту
              </label>
              <textarea
                {...formik.getFieldProps('description')}
                placeholder="Розкажіть історію цього експонату..."
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-y
                  ${formik.touched.description && formik.errors.description
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-green-500 focus:border-transparent'}`}
              />
               {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.description}</p>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Зображення
              </label>
              
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors
                 ${formik.touched.image && formik.errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                
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
                            name="image"
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleFileChange}
                            onBlur={formik.handleBlur} 
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
                        onClick={handleClearFile}
                        className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium underline"
                      >
                        Видалити та вибрати інше
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {formik.touched.image && formik.errors.image && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.image}</p>
              )}
            </div>

            
            {serverError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700 animate-pulse">
                <p>{serverError}</p>
              </div>
            )}

            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`flex-1 py-3 px-6 text-white font-semibold rounded-lg shadow-md transition-all duration-200
                  ${formik.isSubmitting 
                    ? 'bg-green-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-[0.98]'
                  }`}
              >
                {formik.isSubmitting ? 'Публікуємо...' : 'Опублікувати пост'}
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