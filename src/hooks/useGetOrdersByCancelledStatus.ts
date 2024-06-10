import { useQuery } from "@tanstack/react-query";
import OrderItem from "../entities/Order";
import { axiosInstance } from "../services/api-client";
import { useAuthQueryStore } from "../store/auth-store";

const apiClient = axiosInstance;

const useGetOrdersByCancelledStatus = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

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