import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

interface Props {
    inventoryId: number;
    cartId: string;
    jwtToken: string;
}
const apiClient = axiosInstance;

const useIncrementQuantity = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async ({inventoryId, cartId, jwtToken}: Props) => {
            await apiClient.put("/cart/increment", 
            { inventoryId, cartId}, 
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

export default useIncrementQuantity