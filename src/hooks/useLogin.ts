import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../services/api-client';
import { useAuthQueryStore } from '../store/auth-store';

interface FormData {
  email: string;
  password: string;
}

const apiClient = axiosInstance;

const useLogin = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setJwtToken} = useAuthQueryStore();
  
  const mutation = useMutation({
    mutationFn: (data: FormData) => apiClient.post("/user/login", data)
    .then((res) => res.data),

    onSuccess: (response) => {
      const jwtToken = response.jwtToken;
      setJwtToken(jwtToken);
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['cart']);
      queryClient.invalidateQueries(['cartTotal']);
      queryClient.invalidateQueries(['product']);
      const role = response.role;
      if(role==="ADMIN"){
        navigate("/admin");
      }
      else if(role==="SELLER"){
        navigate("/seller")
      }else{
        navigate("/")
      }
      console.log("login successful", role)
      
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    loading,
    onSubmit,
  };
};

export default useLogin;
