import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';
const apiClient = axiosInstance;

export interface OrderProps{
    jwtToken: string;
    orderId: string;
}

const useHandleOrders = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({jwtToken, orderId} : OrderProps) => {
            await apiClient.put(`/order/process/${orderId}`, {}, 
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['pendingOrders']);
                queryClient.invalidateQueries(['toPayOrders']);
                queryClient.invalidateQueries(['toShipOrders'])
                queryClient.invalidateQueries(['toReceiveOrders'])
                queryClient.invalidateQueries(['completedOrders'])
                queryClient.invalidateQueries(['allOrders'])
                queryClient.invalidateQueries(['allOrderList'])
            }
        }
    )
}

export default useHandleOrders