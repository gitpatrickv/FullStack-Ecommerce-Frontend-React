import { useQuery } from "@tanstack/react-query";
import RatingAndReviewResponse from "../../entities/RatingAndReview";
import { axiosInstance } from "../../services/api-client";
import { PaginationProps } from "./useGet1StarRatingAndReview";

const apiClient = axiosInstance;

const useGetAllRatingAndReview = ({productId, pageNo, pageSize} : PaginationProps) => {
    return useQuery({
        queryKey: ['ratingAndReview',productId, pageNo, pageSize],
        queryFn: async () => {
            const {data} = await apiClient.get<RatingAndReviewResponse>(`/product/review/get/all/${productId}`,{
                params: {
                    pageNo: pageNo - 1,
                    pageSize: pageSize
                  } 
            });
            return data;
        },
        enabled: !!productId,
    });
}

export default useGetAllRatingAndReview