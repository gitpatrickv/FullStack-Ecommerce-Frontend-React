import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

interface Props {
    jwtToken: string;
    cartId: string;
}
const apiClient = axiosInstance;

const useDeleteCart = () => {
  const queryClient = useQueryClient();
    
    return useMutation(
        async({jwtToken, cartId} : Props) => 
            await apiClient.delete(`/cart/delete/${cartId}`, 
         {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['cart']);
                queryClient.invalidateQueries(['cartTotal']);
            }
        }
    );
  
   
  };

export default useDeleteCart