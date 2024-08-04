import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

interface StoreRatingProps {
    storeTotalRating: number;
    storeRatingAvg: number;
    productCount: number;
}

const useGetStoreRating = (storeId: string) => {
    return useQuery({
        queryKey: ['storeRating', storeId],
        queryFn: async () => {
            const {data} = await apiClient.get<StoreRatingProps>(`/rate/store/count/${storeId}`);
            return data;
        },
        enabled: !!storeId,
    });
}

export default useGetStoreRating