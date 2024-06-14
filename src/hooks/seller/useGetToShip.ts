import { useQuery } from "@tanstack/react-query";
import { OrdersResponse } from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

const useGetToShip = (jwtToken: string, storeId: string) => {
    return useQuery ({
        queryKey: ['toShipOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrdersResponse>(`/order/seller/get/to-ship/${storeId}`, 
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

export default useGetToShip