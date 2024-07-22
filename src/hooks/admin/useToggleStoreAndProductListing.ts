const apiClient = axiosInstance;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";


const useToggleStoreAndProductListing = () => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useMutation(
        async(storeId: string) => {
            await apiClient.put(`/store/toggle/${storeId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )            
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['storeList']);
                queryClient.invalidateQueries(['storeProduct']);
                queryClient.invalidateQueries(['storeInfo']);
            }
        },
    )
 
}

export default useToggleStoreAndProductListing