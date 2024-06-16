import { useQuery } from '@tanstack/react-query';
import { OrdersResponse } from '../../entities/Order';
import { axiosInstance } from '../../services/api-client';
const apiClient = axiosInstance;

const useGetAllStoreOrders = (jwtToken: string, storeId: string) => {
    return useQuery ({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const {data} = await apiClient.get<OrdersResponse>(`/order/seller/get/all/${storeId}`, 
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

export default useGetAllStoreOrders