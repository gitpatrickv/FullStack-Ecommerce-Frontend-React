import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

interface Props {
    orderId: string;
    jwtToken: string;
}

const useBuyAgain = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async({orderId, jwtToken} : Props) => {
            const {data} = await apiClient.post(`order/buy/${orderId}`, {} ,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            )
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['cart'])
            }
        }
    )
}

export default useBuyAgain