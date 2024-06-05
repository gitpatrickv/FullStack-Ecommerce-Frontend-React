import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import { useAuthQueryStore } from "../store/auth-store";
import Order from "../entities/Order";

const apiClient = axiosInstance;

const useGetOrdersByToPayStatus = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['orders'],
        queryFn: async () => {
            const {data} = await apiClient.get<Order[]>('/order/get/to-pay', 
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