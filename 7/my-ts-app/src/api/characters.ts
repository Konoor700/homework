import axios from 'axios';
import { ApiResponse } from '../types/hero';


export const getCharacters = async (page: number): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  return response.data;
};