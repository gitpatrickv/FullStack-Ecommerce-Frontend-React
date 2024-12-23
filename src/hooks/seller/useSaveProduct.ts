import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface InventoryModel {
  quantity: number;
  price: number;
  colors: string;
  sizes: string;
}

export interface SaveProductProps {
  productName: string;
  productDescription: string;
  categoryId: number;
  inventoryModels: InventoryModel[];
  file: FileList;
}

const apiClient = axiosInstance;

const useSaveProduct = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  const toast = useToast();
  const [_loading, setLoading] = useState(false);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<SaveProductProps>();

  const mutation = useMutation(
    (formData: FormData) =>
      apiClient.post("/product/save", formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['storeProduct']);
        queryClient.invalidateQueries(['productCount']);
        queryClient.invalidateQueries(['storeInfo']);
        toast({
          position: "top",
          title: "Successfully saved product.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        reset();
      },
      onError: (error: any) => {
        console.error("Error saving product:", error);
        toast({
          position: "top",
          title: "Failed to save product.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      },
    }
  );

  const onSubmit: SubmitHandler<SaveProductProps> = async (data) => {
    setLoading(true);
  
      const formData = new FormData();
      formData.append(
        "product",
        new Blob([JSON.stringify({
          productName: data.productName,
          productDescription: data.productDescription,
          categoryId: data.categoryId,
          inventoryModels: data.inventoryModels,
        })],
        { type: "application/json" })
      );
      // formData.append("file", data.file[0]);
      Array.from(data.file).forEach((file) => {
        formData.append("file", file);
      });

      await mutation.mutate(formData);
      
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    control,
    errors
  };
};

export default useSaveProduct;
