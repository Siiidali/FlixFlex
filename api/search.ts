import {baseUrl} from '../api/baseUrl';

export const search = async (element: string) => {
  const data = await baseUrl.get(`search/multi?query=${element}`);
  return data.data;
};
