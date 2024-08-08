import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
    followed: boolean;
}

const useGetFollowedStoreStatus = (storeId: string) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery({
        queryKey: ['followedStatus', storeId],
        queryFn: async () => {
            const {data} = await apiClient.get<Props>(`/follow/${storeId}`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            return data;
        },
        enabled: !!jwtToken && !!storeId,
    })
}

export default useGetFollowedStoreStatus