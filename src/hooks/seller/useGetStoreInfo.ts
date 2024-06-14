import { useQuery } from '@tanstack/react-query';
import Store from '../../entities/Store';
import { axiosInstance } from '../../services/api-client';

const apiClient = axiosInstance;

const useGetStoreInfo = (jwtToken: string) => {
    return useQuery ({
        queryKey: ['storeInfo'],
        queryFn: async () => {
            const {data} = await apiClient.get<Store>(`/store`, 
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

export default useGetStoreInfo