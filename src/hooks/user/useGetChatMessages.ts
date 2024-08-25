import { useQuery } from "@tanstack/react-query";
import Message from "../../entities/Message";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetChatMessages = (chatId: number) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery ({
    queryKey: ['messages', chatId],
    queryFn: async () => {
        const {data} = await apiClient.get<Message>(`/messages/${chatId}`,
    {
        headers:{
            Authorization: `Bearer ${jwtToken}`,
        }
    })
    
    return data;
},
    enabled: !!jwtToken && !!chatId,
})
}

export default useGetChatMessages