import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useToast } from "@chakra-ui/react";

const apiClient = axiosInstance;

const useAddToFavorites = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation(
        async(productId: string) => {
            const { data } = await apiClient.put(`/user/favorites/add/${productId}`, {},
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
                queryClient.invalidateQueries(['favorites'])
            },
            onError: () => {
                toast({
                    position: "top",
                    title: "The product is no longer available.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            },
        }
    )
}

export default useAddToFavorites