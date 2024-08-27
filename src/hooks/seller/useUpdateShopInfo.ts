import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface UpdateShopProps{
    storeName: string;
    storeDescription: string;
    address: string,
    contactNumber: string;
    shippingFee: number;
}

const apiClient = axiosInstance;

const useUpdateShopInfo = (storeId: string) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const [loading, _setLoading] = useState(false);
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    const mutation =  useMutation(
        async ({storeName, storeDescription, address, contactNumber, shippingFee}: UpdateShopProps) => {
            const {data} = await apiClient.put(
                `/store/update/${storeId}`,
                {storeName,storeDescription, address, contactNumber, shippingFee},
                {
                    headers:{
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            )
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['storeInfo']);  
                queryClient.invalidateQueries(['cart']);
                queryClient.invalidateQueries(['storeProduct']);
                toast({
                    position: "top",
                    title: "Successfully updated store info.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  });     
            }
        }
    )
        const onSubmit: SubmitHandler<UpdateShopProps> = (data) => {
            mutation.mutate(data);
      
        };
        
        return {
             onSubmit, loading
        }
}

export default useUpdateShopInfo