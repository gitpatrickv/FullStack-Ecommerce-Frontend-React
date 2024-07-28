import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

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

            if(data.payment_url){
                console.log("Redirecting to:", data.payment_url); 
                window.location.href = data.payment_url;
            } else {
                toast({
                    position: "top",
                    title: "Failed to redirect to payment page.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
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