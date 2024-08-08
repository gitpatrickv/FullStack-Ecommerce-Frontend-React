import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface CreateStoreProps {
  storeName: string;
  storeDescription: string;
  address: string;
  contactNumber: string;
  shippingFee: number;
}

const apiClient = axiosInstance;

const useCreateStore = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<CreateStoreProps>();
  const toast = useToast();
  const { authStore,setRole } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const role = authStore.role;
  const navigate = useNavigate();

  const mutation = useMutation(
    async ({storeName, storeDescription,address,contactNumber,shippingFee}: CreateStoreProps) => {
      const { data } = await apiClient.post(
        "/store/create",
        {storeName, storeDescription,address,contactNumber,shippingFee},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['storeInfo']);
        toast({
          position: "top",
          title: "Successfully created store",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        if(role === "USER"){
          setRole("SELLER")
        }

        navigate("/seller")
      },
      onError: (error: any) => {
        console.error("Error creating store:", error);
        toast({
          position: "top",
          title: "Error creating store.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        if(error.response?.data.storeName) {
          setError('storeName', {
              type: 'server',
              message: error.response.data.storeName
          })
      }
      }
    }
  );

  const onSubmit: SubmitHandler<CreateStoreProps> = (data) => {
    mutation.mutate(data);
  }

  return {
    onSubmit,register, handleSubmit, errors
  };
};

export default useCreateStore;
