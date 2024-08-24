
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';
import { useAuthQueryStore } from '../../store/auth-store';

const apiClient = axiosInstance;

export interface ChatProps{
    storeName: string;
    storePhotoUrl: string;
    chatId: number;
    content: string;
    timestamp: string;
}

const useGetAllChats = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery ({
    queryKey: ['chatList'],
    queryFn: async () => {
        const {data} = await apiClient.get<ChatProps[]>('/chat',
    {
        headers:{
            Authorization: `Bearer ${jwtToken}`,
        }
    })
    
    return data;
},
    enabled: !!jwtToken,
})
}

export default useGetAllChats