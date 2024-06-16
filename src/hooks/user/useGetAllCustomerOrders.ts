import { useQuery } from "@tanstack/react-query";
import OrderItem from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

const useGetAllCustomerOrders = (jwtToken: string) => {
    return useQuery ({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrderItem[]>('/order/get/all', 
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

export default useGetAllCustomerOrders