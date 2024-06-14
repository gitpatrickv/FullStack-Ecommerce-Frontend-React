import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { OrderProps } from "./useConfirmOrder";

const apiClient = axiosInstance;

const useShipOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({jwtToken, orderId} : OrderProps) => {
            await apiClient.put(`/order/ship/${orderId}`, {}, 
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['unpaidOrders']);
            }
        }
    )
}


export default useShipOrder