import { useQuery } from "@tanstack/react-query";
import OrderItem from "../../entities/Order";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetProductsToRate = (orderId: string) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["rateProducts", orderId],
    queryFn: async () => {
      const { data } = await apiClient.get<OrderItem[]>(
        `/order/get/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!orderId,
  });
};

export default useGetProductsToRate;
