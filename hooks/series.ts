import {useQuery} from '@tanstack/react-query';
import {} from '../api/movies';
import {AxiosError} from 'axios';
import {getSerie, getSeries, getTop5Series} from '../api/series';
import {TMDBApiResponse, TMDBApiResponseDetails} from '../types/apiTypes';

export const useGetSeries = (page: number) => {
  const query = useQuery<TMDBApiResponse, AxiosError>({
    queryKey: ['Series', page],
    queryFn: async () => {
      return await getSeries(page);
    },
    keepPreviousData: true,
    staleTime: 5000,
  });
  return query;
};

export const useGetTopSeries = () => {
  const query = useQuery<TMDBApiResponse, AxiosError>({
    queryKey: ['TopSeries'],
    queryFn: async () => {
      return await getTop5Series();
    },
    staleTime: 5000,
  });
  return query;
};
export const useGetSerie = (id: number) => {
  const query = useQuery<TMDBApiResponseDetails, AxiosError>({
    queryKey: ['serie', id],
    queryFn: async () => {
      return await getSerie(id);
    },
    staleTime: 5000,
  });
  return query;
};
