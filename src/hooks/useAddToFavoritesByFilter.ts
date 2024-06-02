import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

interface Props {
    jwtToken: string;
}

const apiClient = axiosInstance;

const useAddToFavoritesByFilter = () => {

    const queryClient = useQueryClient();
    return useMutation(
        async({jwtToken} : Props) => {
            const { data } = await apiClient.put(`/user/favorites/cart/add`, {},
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
                queryClient.invalidateQueries(['cart','favorites'])
            }
        }
    )
}

export default useAddToFavoritesByFilter