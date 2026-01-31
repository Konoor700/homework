import axios from 'axios';

let navigateAction: ((path: string) => void) | null = null;

export const setNavigate = (fn: (path: string) => void) => {
  navigateAction = fn;
};

const axiosInstance = axios.create({
  baseURL: 'https://playground.zenberry.one/api', 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
  
    console.log('Intercepting request to:', config.url);
    if (token) {
      console.log('Token found, attaching to headers.');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in localStorage!');
    }
    

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('401 Unauthorized detected. Logging out.');
      localStorage.removeItem('token');
      if (navigateAction) {
        navigateAction('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;