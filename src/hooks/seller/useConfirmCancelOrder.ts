import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';

interface Props {
    orderId: string;
    jwtToken: string;
}

const apiClient = axiosInstance;

const useConfirmCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async({orderId, jwtToken} : Props) => {
            await apiClient.post(`/order/confirm/cancel/${orderId}` , {},
                {
                    headers:{
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['cancelledOrders']);
            }
        }
    )
}

export default useConfirmCancelOrder