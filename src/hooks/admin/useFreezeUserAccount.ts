const apiClient = axiosInstance;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
const useFreezeUserAccount = () => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useMutation(
        async(email: string) => {
            await apiClient.put(`/user/freeze/${email}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )            
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['userList']);
            }
        },
    )
}

export default useFreezeUserAccount