import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

interface Props {
    jwtToken: string;
}

const apiClient = axiosInstance;

const useDeleteAllCarts = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async({jwtToken} : Props) => 
            await apiClient.delete(`/cart/delete`, 
         {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['cart', 'cartTotal']);
            }
        }
    );
}

export default useDeleteAllCarts