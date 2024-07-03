import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useToast } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
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
  const toast = useToast();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
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
        navigate("/seller")
      },
      onError: (error) => {
        console.error("Error creating store:", error);
        toast({
          position: "top",
          title: "Error creating store.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  );

  const onSubmit: SubmitHandler<CreateStoreProps> = (data) => {
    mutation.mutate(data);
  }

  return {
    onSubmit
  };
};

export default useCreateStore;
