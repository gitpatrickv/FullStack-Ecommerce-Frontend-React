import { useQuery } from "@tanstack/react-query";
import Product from "../entities/Product";
import { axiosInstance } from "../services/api-client";


const apiClient = axiosInstance;

const useProducts = () => useQuery ({
  queryKey: ['product'],
  queryFn: () => apiClient.get<Product[]>('product'),
});
export default useProducts