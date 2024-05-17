import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import Cart from "../entities/Cart";
import CartTotal from "../entities/CartTotal";

const apiClient = axiosInstance;

const useCartTotal = (jwtToken: string,) => {
    return useQuery<CartTotal>({
        queryKey: ['cartTotal'],
        queryFn: async () => {
          const { data } = await apiClient.get<CartTotal>('cart/total', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          return data;
        },
      });
    
}

export default useCartTotal