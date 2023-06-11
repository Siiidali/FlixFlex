import {useQuery} from '@tanstack/react-query';
import {TMDBMovieDetails, TMDBShowDetails} from '../types/apiTypes';
import {AxiosError} from 'axios';
import {getMovie} from '../api/movies';
import {getSerie} from '../api/series';

export const useGetMovieOrSerie = (id: number, type: string) => {
  if (type === 'movie') {
    const query: any = useQuery<TMDBMovieDetails, AxiosError>({
      queryKey: ['movie', id],
      queryFn: async () => {
        return await getMovie(id);
      },
      staleTime: 5000,
    });
    return query;
  } else {
    const query: any = useQuery<TMDBShowDetails, AxiosError>({
      queryKey: ['serie', id],
      queryFn: async () => {
        return await getSerie(id);
      },
      staleTime: 5000,
    });
    return query;
  }
};
