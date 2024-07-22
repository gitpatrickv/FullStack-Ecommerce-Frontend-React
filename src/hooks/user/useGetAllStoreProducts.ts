
import { axiosInstance } from "../../services/api-client";
import StoreResponse from "../../entities/AllProductResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
    storeId: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
}

const apiClient = axiosInstance;

const useGetAllStoreProducts = ({storeId, pageNo, pageSize, sortBy}: Props) => useQuery ({
    queryKey: ['storeProduct', storeId, pageNo, pageSize, sortBy],
    queryFn: () => apiClient.get<StoreResponse>(`product/store/${storeId}`, {
      params: {
        pageNo: pageNo - 1,
        pageSize: pageSize,
        sortBy: sortBy
      }
    }),
  });


export default useGetAllStoreProducts