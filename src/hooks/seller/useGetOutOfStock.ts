import { useQuery } from "@tanstack/react-query";
import Inventory from "../../entities/Inventory";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;


const useGetOutOfStock = (storeId: string) => {
    const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
    return useQuery ({
        queryKey: ['outOfStock'],
        queryFn: async () => {
            const {data} = await apiClient.get<Inventory[]>(`/inventory/stock/${storeId}`, 
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

export default useGetOutOfStock