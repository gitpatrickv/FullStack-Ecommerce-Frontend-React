import { useQuery } from "@tanstack/react-query";
import OrderItem from "../entities/Order";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

const useGetOrdersByCancelledStatus = (jwtToken: string) => {
    
    return useQuery ({
        queryKey: ['cancelledOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrderItem[]>('/order/get/cancelled', 
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

export default useGetOrdersByCancelledStatus