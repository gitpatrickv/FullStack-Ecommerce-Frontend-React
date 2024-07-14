import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface ReplyProps {
    reviewId: number;
    storeId: string;
    sellersReply: string;
}

const apiClient = axiosInstance;
const useReplyToReviews = (reviewId: number, storeId: string ) => {
    const queryClient = useQueryClient();
    const {register, handleSubmit} = useForm<ReplyProps>();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: ReplyProps) => apiClient.post(`/product/review/reply`, data,
            {
            headers: {
                    Authorization: `Bearer ${jwtToken}`
                    }
            }
        )
        .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries(['manageProductReview']);
            queryClient.invalidateQueries(['ratingAndReview']);
            toast({
                position: "top",
                title: "Reply sent successfully!",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
        },
    })

    const onSubmit: SubmitHandler<{ sellersReply: string }> = (data) => {
        mutation.mutate({...data, reviewId, storeId});
    }

    return {
        register, handleSubmit, onSubmit
    }
 
}

export default useReplyToReviews