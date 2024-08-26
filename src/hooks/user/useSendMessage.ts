import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface SendMessageProps {
    content: string;
    chatId: number;
}

const apiClient = axiosInstance;

const useSendMessage = () => {
    const queryClient = useQueryClient();
        const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useMutation(
        async ({content, chatId}: SendMessageProps) => {
            await apiClient.post("/messages", 
            { content, chatId}, 
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['messages']);
            },   
            onError: (error) => {
                console.error("Message submission failed:", error);
            },
        }
    )
}

export default useSendMessage