const apiClient = axiosInstance;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const useSuspendProduct = () => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useMutation(
        async(productId: string) => {
            await apiClient.put(`/product/suspend/${productId}`, {},
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
                queryClient.invalidateQueries(['productDetail']);
                queryClient.invalidateQueries(['delistedCount']);
                queryClient.invalidateQueries(['storeInfo']);
            }
        },
    )
}

export default useSuspendProduct