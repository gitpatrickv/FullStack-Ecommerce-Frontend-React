import { useQuery } from "@tanstack/react-query";
import OrderItem from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

const useGetUnpaidOrders = (jwtToken: string, storeId: string) => {
    return useQuery ({
        queryKey: ['unpaidOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrderItem[]>(`/order/seller/get/unpaid/${storeId}`, 
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

export default useGetUnpaidOrders