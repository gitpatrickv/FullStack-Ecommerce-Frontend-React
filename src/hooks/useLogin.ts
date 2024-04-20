import { useMutation } from '@tanstack/react-query';
import  { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { axiosInstance } from '../services/api-client';
import { useNavigate } from 'react-router-dom';


interface FormData {
    email: string;
    password: string;
  }

  const apiClient = axiosInstance;
  
const useLogin = () => {

    const { register, handleSubmit } = useForm<FormData>();
    
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
    
  const mutation = useMutation((data: FormData) =>
    apiClient.post("/user/login", data).then((res) => res.data)
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      isLoading(true);
      const response = await mutation.mutateAsync(data);
      const jwtToken = response.data;
      localStorage.setItem("jwtToken", jwtToken);
      navigate("/")
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      isLoading(false);
    }
  };
  return (
    { register, handleSubmit, loading, onSubmit}
  );
}

export default useLogin