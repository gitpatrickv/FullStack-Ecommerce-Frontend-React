import { useQuery } from "@tanstack/react-query";
import OrderItem from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

const useGetOrdersByPendingStatus = (jwtToken: string) => {
    return useQuery ({
        queryKey: ['pendingOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrderItem[]>('/order/get/pending', 
            {
                headers:{
                    Authorization: `Bearer ${jwtToken}`,
                }
            }) 
            return data;
        },
        enabled: !!jwtToken
    })
}

export default useGetOrdersByPendingStatus