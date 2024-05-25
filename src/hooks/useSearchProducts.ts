import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import Product from "../entities/Product";

const apiClient = axiosInstance;
const useSearchProducts = (keyword: string) => useQuery<Product[]>({
    queryKey: ['product', keyword],
    queryFn: async () => {
        if(!keyword) return [];
        const {data} = await apiClient.get<Product[]>('/product/search', {
          params: { keyword: keyword },
        });
        return data;
    },
    enabled: !!keyword, 
  });
export default useSearchProducts