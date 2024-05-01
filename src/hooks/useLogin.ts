import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../services/api-client';

interface FormData {
  email: string;
  password: string;
}

const apiClient = axiosInstance;

const useLogin = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: FormData) => apiClient.post("/user/login", data)
    .then((res) => res.data),

    onSuccess: (response) => {
      const jwtToken = response.jwtToken;
      localStorage.setItem("jwtToken", jwtToken);
      
      const role = response.role;
      if(role==="ADMIN"){
        navigate("/admin");
      }
      else if(role==="SELLER"){
        navigate("/seller")
      }else{
        navigate("/")
      }
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
