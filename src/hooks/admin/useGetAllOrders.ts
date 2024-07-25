import { useQuery } from "@tanstack/react-query";
import { Order } from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetAllOrders = () => {

    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['allOrderList'],
        queryFn: async () => {
            const {data} = await apiClient.get<Order[]>(`/order/all`, 
            {
                headers:{
                    Authorization: `Bearer ${jwtToken}`,
                },  
            }) 
            return data;
        },
        enabled: !!jwtToken
    })
}

export default useGetAllOrders