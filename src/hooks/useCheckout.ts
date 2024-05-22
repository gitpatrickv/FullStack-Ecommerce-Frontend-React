import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import Cart from "../entities/Cart";

const apiClient = axiosInstance;

const useCheckout = (jwtToken : string) => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => apiClient.get<Cart[]>('/cart/checkout',
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        })
    })
}

export default useCheckout
