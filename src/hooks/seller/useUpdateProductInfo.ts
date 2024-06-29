import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

export interface UpdateProductInfoProps {
    productId: string;
    productName: string;
    productDescription: string;
}

const useUpdateProductInfo = (productId: string) => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: UpdateProductInfoProps) => apiClient.put(`/product/update`, data,
            {
            headers: {
                    Authorization: `Bearer ${jwtToken}`
                    }
            }
        )
        .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries(['storeProduct']);
            toast({
                position: "top",
                title: "Product Info. Successfully Updated",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
        },
    })

    const onSubmit: SubmitHandler<{ productName: string, productDescription: string }> = (data) => {
        mutation.mutate({...data, productId});
    }

    return {
        onSubmit
    }
}

export default useUpdateProductInfo