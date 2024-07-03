import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

interface Props {
    jwtToken: string;
    productId: string;
}
const apiClient = axiosInstance;

const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async({jwtToken, productId} : Props) => 
            await apiClient.delete(`/product/delete/${productId}`, 
         {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['product']);
                queryClient.invalidateQueries(['storeProduct']);
            }
        }
    );


}

export default useDeleteProduct