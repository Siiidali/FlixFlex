import {useQuery} from '@tanstack/react-query';
import {getMovie, getMovies, getTop5Movies} from '../api/movies';
import {AxiosError} from 'axios';
import {TMDBApiResponse, TMDBMovieDetails} from '../types/apiTypes';

export const useGetMovies = (page: number) => {
  const query = useQuery<TMDBApiResponse, AxiosError>({
    queryKey: ['movies', page],
    queryFn: async () => {
      return await getMovies(page);
    },
    keepPreviousData: true,
    staleTime: 5000,
  });
  return query;
};

export const useGetTopMovies = () => {
  const query = useQuery<TMDBApiResponse, AxiosError>({
    queryKey: ['TopMovies'],
    queryFn: async () => {
      return await getTop5Movies();
    },
    staleTime: 5000,
  });
  return query;
};

export const useGetMovie = (id: number) => {
  const query = useQuery<TMDBMovieDetails, AxiosError>({
    queryKey: ['movie', id],
    queryFn: async () => {
      return await getMovie(id);
    },
    staleTime: 5000,
  });
  return query;
};
