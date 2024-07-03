
import { axiosInstance } from "../../services/api-client";
import AllProductsResponse from "../../entities/AllProductResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
    categoryId: string;
    pageNo: number;
    pageSize: number;
}

const apiClient = axiosInstance;

const useGetAllProductsByCategory = ({categoryId, pageNo, pageSize}: Props) => useQuery ({
    queryKey: ['categoryProduct', categoryId, pageNo, pageSize],
    queryFn: () => apiClient.get<AllProductsResponse>(`/product/category/${categoryId}`, {
      params: {
        pageNo: pageNo - 1,
        pageSize: pageSize
      }
    }),
  });


export default useGetAllProductsByCategory