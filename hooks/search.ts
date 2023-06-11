import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {search} from '../api/search';
import {TMDBApiResponse} from '../types/apiTypes';

export const useSearch = (element: string) => {
  const query = useQuery<TMDBApiResponse, AxiosError>({
    queryKey: ['Search', element],
    queryFn: async () => {
      return await search(element);
    },
    staleTime: 5000,
    refetchOnMount: true,
  });
  return query;
};
