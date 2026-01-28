import { api } from '@/shared/api';

export const getComparisonResult = async (quantity: number, algorithms: string[]) => {
  const response = await api.get(`ticket/comparison`, {
    params: {
      quantity,
      algs: algorithms,
    },
    paramsSerializer: { indexes: null },
  });

  return response.data;
};
