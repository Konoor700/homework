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
    
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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
     
      localStorage.removeItem('token');
      
      if (navigateAction) {
        navigateAction('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;