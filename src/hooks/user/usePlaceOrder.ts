import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

interface Props{
    jwtToken: string,
    paymentMethod: string;
}

const usePlaceOrder = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation(
        async ({jwtToken,paymentMethod} : Props) => {
            const { data } = await apiClient.post(`/order/${paymentMethod}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            )

            if(data.payment_url){
                window.location.href = data.payment_url;
            } 
            return data;
        },
        {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
            queryClient.invalidateQueries(['cartTotal']);
            queryClient.invalidateQueries(['toPayOrders']);
            queryClient.invalidateQueries(['productDetail']);
            queryClient.invalidateQueries(['product']);
            queryClient.invalidateQueries(['messages']);
            queryClient.invalidateQueries(['chatList']);
            queryClient.invalidateQueries(['storeChatList']);
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