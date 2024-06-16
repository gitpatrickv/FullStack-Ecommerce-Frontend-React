import { useQuery } from "@tanstack/react-query";
import { OrdersResponse } from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

const useGetPendingOrders = (jwtToken: string, storeId: string) => {
    return useQuery ({
        queryKey: ['pendingOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrdersResponse>(`/order/seller/get/pending/${storeId}`, 
            {
                headers:{
                    Authorization: `Bearer ${jwtToken}`,
                }
            }) 
            return data;
        },
        enabled: !!jwtToken && !!storeId
    })
}

export default useGetPendingOrders