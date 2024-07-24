
import { useQuery } from "@tanstack/react-query";
import Store from "../../entities/Store";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

export const useGetAllStore = (sortBy: string) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['storeList', sortBy],
        queryFn: async () => {
            const {data} = await apiClient.get<Store[]>(`/store/list`, 
            {
                headers:{
                    Authorization: `Bearer ${jwtToken}`,
                },  
                params: {
                    sortBy: sortBy
                },
            }) 
            return data;
        },
        enabled: !!jwtToken
    })
}
