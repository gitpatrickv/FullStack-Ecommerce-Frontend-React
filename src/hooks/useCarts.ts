
import { axiosInstance } from '../services/api-client';
import Cart from '../entities/Cart';
import { useQuery } from '@tanstack/react-query';

const apiClient = axiosInstance;

const useCarts = (jwtToken : string) => useQuery ({
    queryKey: ['cart'],
    queryFn: () => apiClient.get<Cart[]>('cart', {
        headers: {
            Authorization: `Bearer ${jwtToken}`, 
        },
    }),
});


export default useCarts