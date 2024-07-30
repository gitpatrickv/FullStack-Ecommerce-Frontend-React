import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface changePasswordProps{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    changePasswordRequest?:string;
}

const schema = z.object ({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(8, { message: "New Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, "Confirm password is required"),
})


const apiClient = axiosInstance;

const useChangePassword = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<changePasswordProps>({resolver: zodResolver(schema)});
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
            onError: (error: any) => {
                toast({
                    position: "top",                    
                    title: "Invalid Password!",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });

                if(error.response?.data.oldPassword) {
                    setError('oldPassword', {
                        type: 'server',
                        message: error.response.data.oldPassword
                    })
                }
                if(error.response?.data.changePasswordRequest) {
                    setError('changePasswordRequest', {
                        type: 'server',
                        message: error.response.data.changePasswordRequest
                    })
                }
            }
        }
    )
    const onSubmit: SubmitHandler<changePasswordProps> = (data) => {
        mutation.mutate(data);
    };

    return {
        onSubmit, loading, register, handleSubmit, errors
    }

}

export default useChangePassword