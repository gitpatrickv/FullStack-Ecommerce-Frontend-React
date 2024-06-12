import { useQuery } from "@tanstack/react-query";
import OrderItem from "../entities/Order";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

const useGetOrdersByToShipStatus = (jwtToken: string) => {
    return useQuery ({
        queryKey: ['toShipOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrderItem[]>('/order/get/to-ship', 
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

export default useGetOrdersByToShipStatus