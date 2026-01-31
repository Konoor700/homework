import axiosInstance from './axiosInstance';


const BASE_URL = 'https://playground.zenberry.one';

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

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
   
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
    });

    console.log('SERVER LOGIN RESPONSE:', response.data);
    
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const register = async (
  username: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    
    const response = await axiosInstance.post(`${BASE_URL}/users/register`, {
      username,
      password,
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};