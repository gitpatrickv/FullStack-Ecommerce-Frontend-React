import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';
import { useAuthQueryStore } from '../../store/auth-store';
import { ChatProps } from '../user/useGetAllChats';

const apiClient = axiosInstance;

const useGetAllStoreChats = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    return useQuery ({
    queryKey: ['storeChatList'],
    queryFn: async () => {
        const {data} = await apiClient.get<ChatProps[]>(`/chat/store`,
    {
        headers:{
            Authorization: `Bearer ${jwtToken}`,
        }
    })
    
    return data;
},
    enabled: !!jwtToken
})
}

export default useGetAllStoreChats