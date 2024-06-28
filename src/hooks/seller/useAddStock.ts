import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

const apiClient = axiosInstance;

interface AddStockProps {
    quantity: number;
    inventoryId: number
}

const useAddStock = (inventoryId: number) => {
    const queryClient = useQueryClient();
    const {register, handleSubmit} = useForm<AddStockProps>();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: AddStockProps) => apiClient.post(`/inventory/add`, data,
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
                title: "Stock updated",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
        },
    })

    const onSubmit: SubmitHandler<{ quantity: number }> = (data) => {
        mutation.mutate({...data, inventoryId});
    }

    return {
        register, handleSubmit, onSubmit
    }
}

export default useAddStock
