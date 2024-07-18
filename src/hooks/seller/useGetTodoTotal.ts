import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';
import { useAuthQueryStore } from '../../store/auth-store';
const apiClient = axiosInstance;

interface TodoProps{
    pendingOrderTotal: number;
    toProcessShipmentTotal: number;
    processedShipmentTotal: number;
    pendingCancelledOrders: number;
    outOfStock: number;
}


const useGetTodoTotal = (storeId: string) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['todoTotal'],
        queryFn: async () => {
            const {data} = await apiClient.get<TodoProps>(`/order/get/todo/total/${storeId}`, 
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

export default useGetTodoTotal