import { useQuery } from "@tanstack/react-query";
import CartTotal from "../entities/CartTotal";
import { axiosInstance } from "../services/api-client";

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
        enabled: !!jwtToken,
      });
    
}

export default useCartTotal