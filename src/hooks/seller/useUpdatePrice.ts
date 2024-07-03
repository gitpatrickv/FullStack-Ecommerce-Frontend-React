import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface UpdatePriceProps {
    price: number;
    inventoryId: number
}

const useUpdatePrice = (inventoryId: number) => {
    const queryClient = useQueryClient();
    const {register, handleSubmit} = useForm<UpdatePriceProps>();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: UpdatePriceProps) => apiClient.put(`/inventory/update`, data,
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
                title: "Price Successfully Updated",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
        },
    })

    const onSubmit: SubmitHandler<{ price: number }> = (data) => {
        mutation.mutate({...data, inventoryId});
    }

    return {
        register, handleSubmit, onSubmit
    }
}

export default useUpdatePrice