import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import RatingAndReview from "../../entities/RatingAndReview";

const apiClient = axiosInstance;

const useGet2StarRatingAndReview = (productId: string) => {
    return useQuery({
        queryKey: ['ratingAndReview', productId],
        queryFn: async () => {
            const {data} = await apiClient.get<RatingAndReview[]>(`/product/review/get/2/${productId}`);
            return data;
        },
        enabled: !!productId,
    });
}

export default useGet2StarRatingAndReview