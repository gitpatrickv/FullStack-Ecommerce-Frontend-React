
import { useQuery } from '@tanstack/react-query';
import { OrdersResponse } from '../../entities/Order';
import { axiosInstance } from '../../services/api-client';
const apiClient = axiosInstance;

const useGetShippingOrders = (jwtToken: string, storeId: string) => {
    return useQuery ({
        queryKey: ['toReceiveOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrdersResponse>(`/order/seller/get/shipping/${storeId}`, 
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

export default useGetShippingOrders