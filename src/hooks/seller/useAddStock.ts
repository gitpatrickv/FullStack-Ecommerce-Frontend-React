import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

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
        mutationFn: (data: AddStockProps) => apiClient.put(`/inventory/add`, data,
            {
            headers: {
                    Authorization: `Bearer ${jwtToken}`
                    }
            }
        )
        .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries(['storeProduct']);
            queryClient.invalidateQueries(['outOfStock']);
            queryClient.invalidateQueries(['todoTotal']);
            toast({
                position: "top",
                title: "Stock Successfully Updated",
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
