import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
    recipient: string;
}

const useCreateChat = () => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useMutation(
        async({recipient} : Props) => {
            await apiClient.post(`/chat/${recipient}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )            
        },
        {
            onSuccess: () => {
              queryClient.invalidateQueries(['chatList']);
            }
          },
    )
}

export default useCreateChat