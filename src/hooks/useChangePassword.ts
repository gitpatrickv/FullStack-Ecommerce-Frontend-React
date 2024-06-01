import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../services/api-client";
import { useAuthQueryStore } from "../store/auth-store";

export interface changePasswordProps{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const apiClient = axiosInstance;

const useChangePassword = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { register, handleSubmit, reset } = useForm<changePasswordProps>();
    const [loading, setLoading] = useState(false);
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    const mutation = useMutation(
        async({oldPassword, newPassword, confirmPassword} : changePasswordProps) => {
            const {data} = await apiClient.put(
                "/user/account/password",
                {oldPassword, newPassword, confirmPassword},
                {
                    headers:{
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            )
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['user'])
                toast({
                    position: "top",
                    title: "Password Changed Successfully!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                  reset();
            },
            onError: () => {
                toast({
                    position: "top",                    
                    title: "Invalid Password!",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
            }
        }
    )
    const onSubmit: SubmitHandler<changePasswordProps> = (data) => {
        mutation.mutate(data);
    };

    return {
        onSubmit, loading, register, handleSubmit
    }

}

export default useChangePassword