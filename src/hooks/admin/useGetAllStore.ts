
import { useQuery } from "@tanstack/react-query";
import Store from "../../entities/Store";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

export const useGetAllStore = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['storeList'],
        queryFn: async () => {
            const {data} = await apiClient.get<Store[]>(`/store/list`, 
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
