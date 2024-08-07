import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface StoreFollowerProps {
    storeFollowerId: number;
    followed: boolean;
    storeId: string;
    storeName: string;
    storePhotoUrl: string;
}

const apiClient = axiosInstance;

const useGetAllFollowedStore = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery ({
    queryKey: ['followedStoreList'],
    queryFn: async () => {
        const {data} = await apiClient.get<StoreFollowerProps[]>('/follow/store',
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

export default useGetAllFollowedStore