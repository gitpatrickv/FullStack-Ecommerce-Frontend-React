import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { axiosInstance } from "../services/api-client";
import { useAuthQueryStore } from "../store/auth-store";

export interface UpdateAccountProps{
    name:string;
    address:string;
    contactNumber:string;
    
}
const apiClient = axiosInstance;

const useUpdateAccountInfo = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;
  
    const mutation =  useMutation(
    async ({name, address, contactNumber}: UpdateAccountProps) => {
        const {data} = await apiClient.put(
            "/user/account/profile",
            {name, address, contactNumber},
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
            queryClient.invalidateQueries(['user']);    
            toast({
                position: "top",
                title: "Successfully updated account info.",
                status: "success",
                duration: 1000,
                isClosable: true,
              });     
        }
    }
)
    const onSubmit: SubmitHandler<UpdateAccountProps> = (data) => {
        mutation.mutate(data);
  
    };
    
    return {
         onSubmit, loading
    }
    
 
}

export default useUpdateAccountInfo