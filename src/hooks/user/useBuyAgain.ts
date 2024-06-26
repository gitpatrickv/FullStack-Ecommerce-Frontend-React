import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useToast } from "@chakra-ui/react";

const apiClient = axiosInstance;

interface Props {
    orderId: string;
    jwtToken: string;
}

const useBuyAgain = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
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
                queryClient.invalidateQueries(["cart"]);
                toast({
                    position: "top",
                    title: "Item has been added to your cart",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            },
            onError: () => {
                toast({
                    position: "top",
                    title: "The product you tried to order is no longer available.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            },
        }
    );
};

export default useBuyAgain