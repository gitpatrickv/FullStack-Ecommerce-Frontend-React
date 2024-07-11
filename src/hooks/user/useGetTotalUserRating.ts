import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

export interface RatingProps{
    ratingAverage: number;
    overallTotalUserRating: number;
    total1StarUserRating: number;
    total2StarUserRating: number;
    total3StarUserRating: number;
    total4StarUserRating: number;
    total5StarUserRating: number;
}

const useGetTotalUserRating = (productId: string) => {
    return useQuery({
        queryKey: ['userRating', productId],
        queryFn: async () => {
            const {data} = await apiClient.get<RatingProps>(`/product/rating/get/${productId}`);
            return data;
        },
        enabled: !!productId,
    });
}

export default useGetTotalUserRating