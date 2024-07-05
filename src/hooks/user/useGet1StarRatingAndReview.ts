import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import RatingAndReviewResponse from "../../entities/RatingAndReview";

export interface PaginationProps {
    productId: string;
    pageNo: number;
    pageSize: number;
}

const apiClient = axiosInstance;

const useGet1StarRatingAndReview = ({productId, pageNo, pageSize } : PaginationProps) => {
    return useQuery({
        queryKey: ['ratingAndReview', productId, pageNo, pageSize],
        queryFn: async () => {
            const {data} = await apiClient.get<RatingAndReviewResponse>(`/product/review/get/1/${productId}`,
                {
                    params: {
                        pageNo: pageNo - 1,
                        pageSize: pageSize
                      } 
                }
            );
            return data;
        },
        enabled: !!productId,
    });
}

export default useGet1StarRatingAndReview