import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface RateStoreProps{
    orderId: string;
    rating: number;
}

const apiClient = axiosInstance;

const useRateStore = (orderId: string) => {
    const queryClient = useQueryClient();
    const {register, handleSubmit} = useForm<RateStoreProps>();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: RateStoreProps) => apiClient.post(`/rate/store`, data,
            {
            headers: {
                    Authorization: `Bearer ${jwtToken}`
                    }
            }
        )
        .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries(['completedOrders']);
            queryClient.invalidateQueries(['allOrders']);
            queryClient.invalidateQueries(['manageProductReview']);
            queryClient.invalidateQueries(['storeRating']);
            toast({
                position: "top",
                title: "Thank You for Your Feedback!",
                status: "success",
                duration: 2000,
                isClosable: true,
              });             
        },
    })

    const onSubmit: SubmitHandler<{rating: number}> = (data) => {
        mutation.mutate({...data, orderId});
    }

    return {
        register, handleSubmit, onSubmit
    }

}

export default useRateStore