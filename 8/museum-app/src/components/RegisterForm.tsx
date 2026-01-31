import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../store/slices/userSlice';
import type { AppDispatch, RootState } from '../store/store';

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Логін має бути мінімум 3 символи')
      .required("Придумайте ім'я користувача"),
    password: Yup.string()
      .min(6, 'Пароль має бути мінімум 6 символів')
      .required('Придумайте пароль'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(registerUser(values)).unwrap();
        navigate('/'); 
      } catch (err) {
        console.error('Registration failed:', err);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Створити акаунт
        </h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          
         
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Ім'я користувача
            </label>
            <input
              id="username"
              type="text"
              {...formik.getFieldProps('username')}
              placeholder="Придумайте логін"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200
                ${formik.touched.username && formik.errors.username 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-transparent'}`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.username}</p>
            )}
          </div>

          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              placeholder="Придумайте пароль"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200
                ${formik.touched.password && formik.errors.password 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-transparent'}`}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">Пароль має бути надійним (мін. 6 символів)</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700">
              <p>{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md transition-all duration-200
              ${loading 
                ? 'bg-green-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-[0.98]'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Реєстрація...
              </span>
            ) : (
              'Зареєструватися'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Вже є акаунт?{' '}
          <Link 
            to="/login" 
            className="font-medium text-green-600 hover:text-green-500 hover:underline transition-colors"
          >
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;