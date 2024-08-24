import { useQuery } from "@tanstack/react-query";
import Chat from "../../entities/Message";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetChatById = (chatId: number) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery ({
    queryKey: ['chat', chatId],
    queryFn: async () => {
        const {data} = await apiClient.get<Chat>(`/chat/${chatId}`,
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

export default useGetChatById