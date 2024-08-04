import { useDisclosure, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User, schema } from '../../entities/User';
import { axiosInstance } from '../../services/api-client';

const apiClient = axiosInstance;

const useRegisterNewAdmin = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<User>({ resolver: zodResolver(schema) });
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: User) => apiClient.post("/user/register", data)
        .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries(['userList']);
            onClose();
        },
        onError: (error: any) => {
            setLoading(false);
            console.error("Registration failed", error);
            toast({
                position: "top",
                title: "Registration failed.",
                status: "error",
                duration: 1000,
                isClosable: true,
              });  
            
            if(error.response?.data.email) {
                setError('email', {
                    type: 'server',
                    message: error.response.data.email
                })
            }
          },
})

const onSubmit: SubmitHandler<User> = (data) => {
    setLoading(true);
    mutation.mutate(data);
};

return {
    register, handleSubmit, loading, onSubmit, errors, isOpen, onOpen, onClose
    };
};



export default useRegisterNewAdmin