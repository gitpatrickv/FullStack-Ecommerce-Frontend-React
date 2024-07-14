import { useQuery } from "@tanstack/react-query";
import ManageReviewResponse from "../../entities/ManageReview";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface ManageReviewProps{
    storeId: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
}

const apiClient = axiosInstance;

const useManageAllProductReview = ({storeId, pageNo, pageSize, sortBy} : ManageReviewProps) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery({
        queryKey: ['manageProductReview',storeId, pageNo, pageSize, sortBy],
        queryFn: async () => {
            const {data} = await apiClient.get<ManageReviewResponse>(`/seller/customer/service/review/${storeId}`,{
                params: {
                    pageNo: pageNo - 1,
                    pageSize: pageSize,
                    sortBy: sortBy
                  },
                  headers:{
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            return data;
        },
        enabled: !!jwtToken && !!storeId,
    });
}

export default useManageAllProductReview