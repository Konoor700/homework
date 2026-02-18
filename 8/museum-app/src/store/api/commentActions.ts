import axiosInstance from './axiosInstance';

export interface Comment {
  id: string;
  text: string;
  userId: string;
  username: string; 
  createdAt: string;
}


export const getComments = async (exhibitId: string, signal?: AbortSignal): Promise<Comment[]> => {
  try {
    
    const response = await axiosInstance.get(`/exhibits/${exhibitId}/comments`, {
      signal
    });
    return response.data;
  } catch (error) {
   
    throw error; 
  }
};

export const addComment = async (exhibitId: string, text: string): Promise<Comment> => {
  try {
    const response = await axiosInstance.post(`/exhibits/${exhibitId}/comments`, {
      text, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`);
  } catch (error) {
    throw error;
  }
};