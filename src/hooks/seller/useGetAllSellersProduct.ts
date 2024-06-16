import { axiosInstance } from "../../services/api-client";
import AllProductsResponse from "../../entities/AllProductResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
    jwtToken: string;
    pageNo: number;
    pageSize: number;
}

const apiClient = axiosInstance;

const useGetAllSellersProduct = ({jwtToken, pageNo, pageSize}: Props) => useQuery ({
    queryKey: ['storeProduct', pageNo, pageSize],
    queryFn: () => apiClient.get<AllProductsResponse>(`product/store`, 
        {
        headers:{
            Authorization: `Bearer ${jwtToken}`,
        },
      params: {
        pageNo: pageNo - 1,
        pageSize: pageSize
      },
    }),
    enabled: !!jwtToken
  });


export default useGetAllSellersProduct