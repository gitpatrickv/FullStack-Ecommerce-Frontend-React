
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';
import { useAuthQueryStore } from '../../store/auth-store';

interface Props{
    totalSales: number;
}

const apiClient = axiosInstance;

const useGetTotalSales = (storeId: string) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery ({
        queryKey: ['totalSales', storeId],
        queryFn: async () => {
            const {data} = await apiClient.get<Props>(`/order/get/sales/total/${storeId}`, 
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

export default useGetTotalSales