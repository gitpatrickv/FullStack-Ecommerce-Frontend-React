import { useQuery } from "@tanstack/react-query";
import AllProductsResponse from "../entities/AllProductResponse";
import { axiosInstance } from "../services/api-client";

interface Props{
  pageNo: number;
  pageSize: number;
}

const apiClient = axiosInstance;

const useProducts = ({pageNo, pageSize}: Props) => useQuery ({
  queryKey: ['product', pageNo, pageSize],
  queryFn: () => apiClient.get<AllProductsResponse>('product', {
    params: {
      pageNo: pageNo - 1,
      pageSize: pageSize
    }
  }),
});
export default useProducts