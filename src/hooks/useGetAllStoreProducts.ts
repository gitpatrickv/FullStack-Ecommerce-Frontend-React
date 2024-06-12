
import { axiosInstance } from "../services/api-client";
import AllProductsResponse from "../entities/AllProductResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
    storeId: string;
    pageNo: number;
    pageSize: number;
}

const apiClient = axiosInstance;

const useGetAllStoreProducts = ({storeId, pageNo, pageSize}: Props) => useQuery ({
    queryKey: ['storeProduct', storeId, pageNo, pageSize],
    queryFn: () => apiClient.get<AllProductsResponse>(`product/store/${storeId}`, {
      params: {
        pageNo: pageNo - 1,
        pageSize: pageSize
      }
    }),
  });


export default useGetAllStoreProducts