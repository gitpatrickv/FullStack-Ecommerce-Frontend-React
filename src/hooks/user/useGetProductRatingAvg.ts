import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

export interface RatingProps{
    productId: string;
    totalNumberOfUserRating: number;
    ratingAverage?: number;
}

const useGetProductRatingAvg = (productId: string) => {
    return useQuery({
        queryKey: ['rating', productId],
        queryFn: async () => {
            const {data} = await apiClient.get<RatingProps>(`/rating/${productId}`);
            return data;
        },
        enabled: !!productId,
    });
}

export default useGetProductRatingAvg