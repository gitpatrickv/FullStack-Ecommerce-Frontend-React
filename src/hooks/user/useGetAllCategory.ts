import { useQuery } from '@tanstack/react-query';
import Category from '../../entities/Category';
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

const useGetAllCategory = () => useQuery ({
    queryKey: ['category'],
    queryFn: () => apiClient.get<Category[]>('/product/category'),
  });

export default useGetAllCategory