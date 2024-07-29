import { useQuery } from '@tanstack/react-query';
import Store from '../../entities/Store';
import { axiosInstance } from '../../services/api-client';
import { useNavigate } from 'react-router-dom';

const apiClient = axiosInstance;

const useGetStoreInfo = (jwtToken: string) => {
    const navigate = useNavigate();
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
        onError: () => {
            navigate("/seller/store/create")
        },
        enabled: !!jwtToken
    })
}

export default useGetStoreInfo