import { Movie } from '@/types/Movie';
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}/api/v1`,
});

const get = async <T>(path: string): Promise<T> => {
  const response = await AxiosInstance.get(path);
  return response.data;
};

//  TODO - page param
const listMovies = async (): Promise<Movie[]> =>
  await get<Movie[]>('/movie/descriptions');

export { listMovies };
