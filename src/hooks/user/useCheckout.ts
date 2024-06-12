import { useQuery } from "@tanstack/react-query";
import Cart from "../../entities/Cart";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

const useCheckout = (jwtToken : string) => {
    return useQuery({
        queryKey: ['checkout'],
        queryFn: () => apiClient.get<Cart[]>('/cart/checkout',
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        })
    })
}

export default useCheckout
