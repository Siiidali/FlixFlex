import {baseUrl} from './baseUrl';

export const getSeries = async (page: number) => {
  const data = await baseUrl.get(`tv/popular?language=en-US&page=${page}`);
  return data.data;
};

export const getTop5Series = async () => {
  const data = await baseUrl.get(`tv/top_rated?language=en-US&page=1`);
  return data.data;
};

export const getSerie = async (id: number) => {
  const data = await baseUrl.get(`tv/${id}?language=en-US`);
  return data.data;
};
