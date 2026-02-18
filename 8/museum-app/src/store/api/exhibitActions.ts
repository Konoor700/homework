import axiosInstance from './axiosInstance';

export interface Exhibit {
  id: string;
  title?: string; 
  description: string;
  imageUrl: string;
  userId: string;
  username?: string;
  createdAt: string;
}

interface ExhibitsResponse {
  data: Exhibit[];
  total: number;
  page: string | number;
  lastPage: number;
}


export const getAllExhibits = async (
  page: number = 1, 
  limit: number = 10, 
  signal?: AbortSignal
): Promise<{ exhibits: Exhibit[], total: number }> => {
  try {
   
    const response = await axiosInstance.get<ExhibitsResponse>(
      `/exhibits?page=${page}&limit=${limit}`, 
      { signal }
    );
    
    return {
      exhibits: response.data.data, 
      total: response.data.total
    };
  } catch (error) {
    throw error;
  }
};


export const getMyExhibits = async (
  page: number = 1, 
  limit: number = 10,
  signal?: AbortSignal
): Promise<{ exhibits: Exhibit[], total: number }> => {
  try {
    const response = await axiosInstance.get<ExhibitsResponse>(
      `/exhibits/my-posts?page=${page}&limit=${limit}`,
      { signal }
    );
    return {
      exhibits: response.data.data,
      total: response.data.total
    };
  } catch (error) {
    throw error;
  }
};

export const getExhibitById = async (id: string): Promise<Exhibit> => {
  try {
    const response = await axiosInstance.get(`/exhibits/post/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createExhibit = async (data: { title: string; description: string; image: File }): Promise<Exhibit> => {
  try {
    const formData = new FormData();
    
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);

    const response = await axiosInstance.post('/exhibits', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExhibit = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/exhibits/${id}`);
  } catch (error) {
    throw error;
  }
};