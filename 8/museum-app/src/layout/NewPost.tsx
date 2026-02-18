import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createExhibit } from '../store/api/exhibitActions';
import ControlBar from '../components/ControlBar';

const NewPost = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let timer: any; 
    if (isSuccess) {
      timer = setTimeout(() => {
        if (isMounted.current) {
          navigate('/');
        }
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, navigate]);

  const validationSchema = Yup.object({
    description: Yup.string().required("Опис обов'язковий"),
    image: Yup.mixed().required("Зображення обов'язкове"),
  });

  const formik = useFormik({
    initialValues: {
      description: '',
      image: null as File | null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!values.image) return;
      if (isMounted.current) setServerError('');

      try {
        const autoTitle = `Пост від ${new Date().toLocaleString('uk-UA')}`;
        await createExhibit({
          title: autoTitle, 
          description: values.description,
          image: values.image,
        });
        
        if (isMounted.current) {
          setIsSuccess(true);
        }
      } catch (err: any) {
        if (isMounted.current) {
          const message = err.response?.data?.message || 'Не вдалося створити пост';
          setServerError(Array.isArray(message) ? message.join(', ') : message);
          setSubmitting(false);
        }
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

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full border border-green-100 animate-fadeIn">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Чудово!</h2>
          <p className="text-gray-600 mb-6">Ваш пост успішно опубліковано.</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 overflow-hidden">
            <div className="bg-green-500 h-1.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <ControlBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Створити новий пост</h1>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Опис посту</label>
              <textarea
                {...formik.getFieldProps('description')}
                placeholder="Розкажіть про це фото..."
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${formik.touched.description && formik.errors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-500'}`}
              />
              {formik.touched.description && formik.errors.description && <p className="mt-1 text-xs text-red-500">{formik.errors.description}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Зображення</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-gray-300 hover:bg-gray-50 transition-colors">
                <div className="space-y-1 text-center">
                  {!previewUrl ? (
                    <label htmlFor="file-upload" className="cursor-pointer font-medium text-green-600 hover:text-green-500">
                      <span>Завантажити файл</span>
                      <input id="file-upload" name="image" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    </label>
                  ) : (
                    <img src={previewUrl} alt="Preview" className="mx-auto max-h-64 rounded-lg shadow-md" />
                  )}
                </div>
              </div>
            </div>
            {serverError && <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">{serverError}</div>}
            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={formik.isSubmitting} className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400">
                {formik.isSubmitting ? 'Публікуємо...' : 'Опублікувати'}
              </button>
              <button type="button" onClick={() => navigate('/')} className="py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50">Скасувати</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;