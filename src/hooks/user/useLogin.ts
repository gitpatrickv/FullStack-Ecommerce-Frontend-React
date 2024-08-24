import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../services/api-client';
import { useAuthQueryStore } from '../../store/auth-store';

interface FormData {
  email: string;
  password: string;
}

const apiClient = axiosInstance;

const useLogin = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setJwtToken, setRole, setAuthUser} = useAuthQueryStore();
  const toast = useToast();
  const location = useLocation();

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
      queryClient.invalidateQueries(['favorites']);
      queryClient.invalidateQueries(['productDetail']);
      queryClient.invalidateQueries(['storeProduct']);
      queryClient.invalidateQueries(['storeInfo']);
      queryClient.invalidateQueries(['pendingOrders']);
      queryClient.invalidateQueries(['toPayOrders']);
      queryClient.invalidateQueries(['toShipOrders'])
      queryClient.invalidateQueries(['toReceiveOrders'])
      queryClient.invalidateQueries(['completedOrders'])
      queryClient.invalidateQueries(['allOrders'])
      queryClient.invalidateQueries(['cancelledOrders'])
      queryClient.invalidateQueries(['checkout'])
      queryClient.invalidateQueries(['categoryProduct'])
      queryClient.invalidateQueries(['manageProductReview'])
      queryClient.invalidateQueries(['todoTotal'])
      queryClient.invalidateQueries(['userCount'])
      const currentUser = response.authUser;
      setAuthUser(currentUser);
      const role = response.role;
      setRole(role);

      if(location.pathname === "/login"){
            if(role==="ADMIN"){
        navigate("/admin");
      }else{
        navigate("/")
      }
      }

      if(location.pathname === "/seller/login"){
          navigate("/seller")
      }
      
    },
    onError: (error) => {
      console.error("Login failed", error);
      setLoading(false);
      toast({
        position: "top",
        title: "Invalid account info.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
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
    errors
  };
};

export default useLogin;
