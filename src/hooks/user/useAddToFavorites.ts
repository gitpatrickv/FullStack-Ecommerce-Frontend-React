import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useAddToFavorites = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const queryClient = useQueryClient();
    return useMutation(
        async(productId: string) => {
            const { data } = await apiClient.put(`/user/favorites/add/${productId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            )
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['favorites'])
            }
        }
    )
}

export default useAddToFavorites