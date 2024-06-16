import { axiosInstance } from "../../services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    productId: string;
    cartId: string;
    jwtToken: string;
}
const apiClient = axiosInstance;

const useDecrementQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({productId, cartId, jwtToken} : Props) => {
        await apiClient.put("/cart/decrement",
            { productId, cartId }, 
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        }
    }
  )
}

export default useDecrementQuantity