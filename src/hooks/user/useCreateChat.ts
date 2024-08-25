import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useChatStore } from "../../store/chat-store";

const apiClient = axiosInstance;

interface ChatIdResponse {
    chatId: number;
  }

interface Props {
    recipient: string;
}

const useCreateChat = () => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const { setChatId } = useChatStore();

    return useMutation(
        async({recipient} : Props) => {
            const response = await apiClient.post<ChatIdResponse>(`/chat/${recipient}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )    
            return response.data;        
        },
        {
            onSuccess: (data) => {
              queryClient.invalidateQueries(['chatList']);
              queryClient.invalidateQueries(['storeChatList']);
              const storeChatId = data.chatId;
              setChatId(storeChatId);
            }
          },
    )
}

export default useCreateChat