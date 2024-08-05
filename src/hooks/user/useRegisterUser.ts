import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User, schema } from '../../entities/User';
import { axiosInstance } from '../../services/api-client';
import { useAuthQueryStore } from '../../store/auth-store';
import { useToast } from '@chakra-ui/react';

const apiClient = axiosInstance;

const useRegisterUser = () => {
  const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors },  setError } = useForm<User>({ resolver: zodResolver(schema) });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setJwtToken, setRole} = useAuthQueryStore();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: User) => apiClient.post("/user/register", data)
        .then((res) => res.data),

        onSuccess: (response) => {
          queryClient.invalidateQueries(['user']);
            const jwtToken = response.jwtToken;
            setJwtToken(jwtToken);
            const role = response.role;
            setRole(role);

            if(role==="ADMIN"){
                navigate("/admin");
              }
              else if(role==="SELLER"){
                navigate("/seller/store/create")
              }else{
                navigate("/")
              }
              console.log("login successful", role)
        },
        onError: (error: any) => {
            setLoading(false);
            console.error("Login failed", error);
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
    register, handleSubmit, loading, onSubmit, errors
    };
};

export default useRegisterUser;