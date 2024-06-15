import { useQuery } from "@tanstack/react-query";
import OrderItem from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;


const useGetOrderByCompletedStatus = (jwtToken: string) => {
    return useQuery ({
        queryKey: ['completedOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrderItem[]>('/order/get/completed', 
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

export default useGetOrderByCompletedStatus