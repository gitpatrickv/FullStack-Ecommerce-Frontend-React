import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

interface Props {
    orderId: string;
    jwtToken: string;
}

const apiClient = axiosInstance;

const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async({orderId, jwtToken} : Props) => {
            await apiClient.post(`order/cancel/${orderId}` , {},
                {
                    headers:{
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['toPayOrders']);
                queryClient.invalidateQueries(['cancelledOrders']);
            }
        }
    )
}

export default useCancelOrder