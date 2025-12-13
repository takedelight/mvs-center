import { api } from '@/shared/api';

export const getComparisonResult = async (quantity: number, algorithms: string[]) => {
  const response = await api.get(`ticket/comparison`, {
    params: {
      quantity,
      algs: algorithms,
    },
    paramsSerializer: { indexes: false },
  });
  console.log(api.getUri({ url: 'ticket/comparison', params: { quantity, algs: algorithms } }));

  return response.data;
};
