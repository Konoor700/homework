import axiosInstance from './axiosInstance';


interface LoginResponse {
  user: {
    id: string;
    username: string;
    email?: string;
  };
  token: string;
}

interface RegisterResponse {
  user: {
    id: string;
    username: string;
    email?: string;
  };
  token: string;
}


export const login = async (
  username: string, 
  password: string, 
  signal?: AbortSignal
): Promise<LoginResponse> => {
  try {
   
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
    }, { signal }); 

    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const register = async (
  username: string,
  password: string,
  signal?: AbortSignal
): Promise<RegisterResponse> => {
  try {

    const response = await axiosInstance.post('../users/register', {
      username,
      password,
    }, { signal }); 
    
    return response.data;
  } catch (error) {
    throw error;
  }
};