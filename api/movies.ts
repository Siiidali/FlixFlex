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

export const getMovieVideo = async (id: number) => {
  const data = await baseUrl.get(`movie/${id}/videos`);
  const results = data.data.results.filter(
    (video: any) => video.type === 'Trailer' && video.official,
  );
  const trailers = results.map((video: any) => ({
    id: video.id,
    key: video.key,
  }));
  return trailers;
};
