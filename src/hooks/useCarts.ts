
import { useQuery } from '@tanstack/react-query';
import Cart from '../entities/Cart';
import { axiosInstance } from '../services/api-client';

const apiClient = axiosInstance;

const useCarts = (jwtToken : string) => {
    return useQuery({
    queryKey: ['cart'],
    queryFn: () => apiClient.get<Cart[]>('cart', {
        headers: {
            Authorization: `Bearer ${jwtToken}`, 
        },
    }),
    enabled: !!jwtToken,
})
};


export default useCarts