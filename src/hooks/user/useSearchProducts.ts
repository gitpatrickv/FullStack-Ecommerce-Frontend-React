import { useQuery } from "@tanstack/react-query";
import AllProductsResponse from "../../entities/AllProductResponse";
import { axiosInstance } from "../../services/api-client";

interface Props{
  keyword: string;
  pageNo: number;
  pageSize: number;
  sortBy: string;
}

const apiClient = axiosInstance;
const useSearchProducts = ({ keyword, pageNo, pageSize,sortBy }: Props) => useQuery({
    queryKey: ['product', keyword, pageNo, pageSize,sortBy],
    queryFn: async () => {
        const {data} = await apiClient.get<AllProductsResponse>('/product/search', {
          params: { 
            keyword: keyword,
            pageNo: pageNo - 1,
            pageSize: pageSize,
            sortBy: sortBy
          },
        });
        return data;
    },
    enabled: !!keyword, 
  });
export default useSearchProducts