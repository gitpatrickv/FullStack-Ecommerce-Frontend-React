import { useQuery } from "@tanstack/react-query";
import OrderItem from "../entities/Order";
import { axiosInstance } from "../services/api-client";
import { useAuthQueryStore } from "../store/auth-store";

const apiClient = axiosInstance;

const useGetOrdersByToPayStatus = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['toPayOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrderItem[]>('/order/get/to-pay', 
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

export default useGetOrdersByToPayStatus