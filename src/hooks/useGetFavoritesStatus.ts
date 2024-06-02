import { useQuery } from "@tanstack/react-query";
import Favorites from "../entities/Favorites";
import { axiosInstance } from "../services/api-client";
import { useAuthQueryStore } from "../store/auth-store";

const apiClient = axiosInstance;

const useGetFavoritesStatus = (productId: string) => {
    
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery({
        queryKey: ['favorites', productId],
        queryFn: async () => {
            const {data} = await apiClient.get<Favorites>(`/user/favorites/get/status/${productId}`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            return data;
        },
        enabled: !!jwtToken && !!productId,
    })
 
}

export default useGetFavoritesStatus