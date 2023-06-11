import {baseUrl} from './baseUrl';

export const getMovies = async (page: number) => {
  const data = await baseUrl.get(`movie/popular?language=en-US&page=${page}`);
  return data.data;
};

export const getTop5Movies = async () => {
  const data = await baseUrl.get(`movie/top_rated?language=en-US&page=1`);
  return data.data;
};

export const getMovie = async (id: number) => {
  const data = await baseUrl.get(`movie/${id}?language=en-US`);
  return data.data;
};
