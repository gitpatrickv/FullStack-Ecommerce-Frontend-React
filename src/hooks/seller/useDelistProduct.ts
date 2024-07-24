const apiClient = axiosInstance;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const useDelistProduct = () => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useMutation(
        async(productId: string) => {
            await apiClient.put(`/product/delist/${productId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )            
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['storeProduct']);
                queryClient.invalidateQueries(['product']);
            }
        },
    )
}

export default useDelistProduct