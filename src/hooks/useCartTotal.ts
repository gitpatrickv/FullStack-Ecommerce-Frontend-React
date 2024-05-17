import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

const useCartTotal = (jwtToken: string,) => {
    return useQuery({
        queryKey: ['cartTotal'],
        queryFn: async () => {
          const { data } = await apiClient.get('cart/total', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          return data;
        },
      });
    
}

export default useCartTotal