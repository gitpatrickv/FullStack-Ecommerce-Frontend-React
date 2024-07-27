import { useQuery } from "@tanstack/react-query";
import { PaginateOrdersResponse } from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface Props {
    pageNo: number;
    pageSize: number;
}

const apiClient = axiosInstance;

const useGetAllOrders = ({pageNo, pageSize}: Props) => {

    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['allOrderList', pageNo,pageSize],
        queryFn: async () => {
            const {data} = await apiClient.get<PaginateOrdersResponse>(`/order/all`, 
            {
                headers:{
                    Authorization: `Bearer ${jwtToken}`,
                },  
                params: {
                    pageNo: pageNo - 1,
                    pageSize: pageSize,
                  }
            }) 
            return data;
        },
        enabled: !!jwtToken
    })
}

export default useGetAllOrders