import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

interface Props{
    cartId: string;
    jwtToken: string;
}

const apiClient = axiosInstance;

const useFilterCart = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async({cartId, jwtToken} : Props) => {
            const { data } = await apiClient.put(`/cart/filter/${cartId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['cart', 'cartTotal']);
            }
        },
    )
}

export default useFilterCart