import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

const usePlaceOrder = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation(
        async (jwtToken : string) => {
            const { data } = await apiClient.post("/order", {},
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
            queryClient.invalidateQueries(['toPayOrders', 'cart' , 'cartTotal', 'product'])
            
            toast({
                position: "top",
                title: "Your order has been placed successfully!",
                status: "success",
                duration: 2000,
                isClosable: true,
              });     
        }
    }
    )
}

export default usePlaceOrder