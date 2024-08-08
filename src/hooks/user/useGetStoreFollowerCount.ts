import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

interface StoreFollowerCountProps {
    storeFollowerCount: number;
}

const useGetStoreFollowerCount = (storeId: string) => {
    return useQuery({
        queryKey: ['storeFollowerCount', storeId],
        queryFn: async () => {
            const {data} = await apiClient.get<StoreFollowerCountProps>(`/follow/count/${storeId}`);
            return data;
        },
        enabled: !!storeId,
    });
}

export default useGetStoreFollowerCount