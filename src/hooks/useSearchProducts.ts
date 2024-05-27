import { useQuery } from "@tanstack/react-query";
import AllProductsResponse from "../entities/AllProductResponse";
import { axiosInstance } from "../services/api-client";

interface Props{
  keyword: string
  pageNo: number;
  pageSize: number;
}

const apiClient = axiosInstance;
const useSearchProducts = ({ keyword, pageNo, pageSize }: Props) => useQuery({
    queryKey: ['product', keyword, pageNo, pageSize],
    queryFn: async () => {
        const {data} = await apiClient.get<AllProductsResponse>('/product/search', {
          params: { 
            keyword: keyword,
            pageNo: pageNo - 1,
            pageSize: pageSize
          },
        });
        return data;
    },
    enabled: !!keyword, 
  });
export default useSearchProducts