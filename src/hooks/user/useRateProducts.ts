import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthQueryStore } from "../../store/auth-store";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

interface RateProps{
    productId: string;
    id: number;
    rating: number;
    review: string;
}

const apiClient = axiosInstance;

const useRateProducts = (productId: string, id: number) => {
    const queryClient = useQueryClient();
    const {register, handleSubmit, reset} = useForm<RateProps>();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: RateProps) => apiClient.post(`/product/review`, data,
            {
            headers: {
                    Authorization: `Bearer ${jwtToken}`
                    }
            }
        )
        .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries(['ratingAndReview']);
            queryClient.invalidateQueries(['completedOrders']);
            queryClient.invalidateQueries(['rateProducts']);

            reset();
            toast({
                position: "top",
                title: "Thank You for Your Feedback!",
                status: "success",
                duration: 2000,
                isClosable: true,
              });             
        },
    })

    const onSubmit: SubmitHandler<{rating: number, review: string}> = (data) => {
        mutation.mutate({...data, productId, id});
    }

    return {
        register, handleSubmit, onSubmit
    }
}

export default useRateProducts