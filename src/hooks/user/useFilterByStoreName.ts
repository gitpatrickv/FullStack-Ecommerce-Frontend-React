import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

interface Props{
    storeId: string;
    jwtToken: string;
}

const apiClient = axiosInstance;

const useFilterByStoreName = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async({ storeId, jwtToken } : Props) => {
            await apiClient.put(`/cart/filter/store/${storeId}`, {}, 
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['cart']);
                queryClient.invalidateQueries(['cartTotal']);
            }
        }
    )
}

export default useFilterByStoreName