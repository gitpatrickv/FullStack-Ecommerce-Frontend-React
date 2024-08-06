import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useFollowStore = () => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useMutation(
        async(storeId: string) => {
            await apiClient.put(`/follow/${storeId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )            
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['followedStatus']);
                queryClient.invalidateQueries(['storeFollowerCount'])
            }
        },
    )
}

export default useFollowStore