import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { SubmitHandler } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

interface Props {
    categoryId: string;
    categoryName: string;
}

const apiClient = axiosInstance;

const useEditCategoryName = (categoryId: string) => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: Props) => apiClient.put(`/product/category/update`, data,
            {
            headers: {
                    Authorization: `Bearer ${jwtToken}`
                    }
            }
        )
        .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries(['category']);
            toast({
                position: "top",
                title: "Product Info. Successfully Updated",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
        },
    })

    const onSubmit: SubmitHandler<{categoryName: string}> = (data) => {
        mutation.mutate({...data, categoryId});
    }

    return {
        onSubmit
    }

 
 
}

export default useEditCategoryName

