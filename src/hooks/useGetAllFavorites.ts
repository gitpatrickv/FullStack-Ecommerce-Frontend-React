import { useQuery } from "@tanstack/react-query";
import AllProductModels from "../entities/AllProductResponse";
import { axiosInstance } from "../services/api-client";
import { useAuthQueryStore } from "../store/auth-store";


const apiClient = axiosInstance;

const useGetAllFavorites = () => { 
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery ({
    queryKey: ['favorites'],
    queryFn: async () => {
        const {data} = await apiClient.get<AllProductModels[]>('/user/favorites/get',
    {
        headers:{
            Authorization: `Bearer ${jwtToken}`,
        }
    })
    
    return data;
},
    enabled: !!jwtToken,
})
}
export default useGetAllFavorites