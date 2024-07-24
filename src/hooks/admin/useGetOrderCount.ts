
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface Props {
    orderCount: number;
    totalSales: number;
}

const apiClient = axiosInstance;

const useGetOrderCount = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['orderCount'],
        queryFn: async () => {
            const {data} = await apiClient.get<Props>(`/order/count`, 
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

export default useGetOrderCount