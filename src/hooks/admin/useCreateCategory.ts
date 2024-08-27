import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface CategoryProps {
    categoryName: string;
    file: FileList;
}

const apiClient = axiosInstance;

const useCreateCategory = () => {
    const { authStore } = useAuthQueryStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const jwtToken = authStore.jwtToken;
    const queryClient = useQueryClient();
    const toast = useToast();
    const [_loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryProps>();

    const mutation = useMutation(
        (formData: FormData) =>
          apiClient.post("/product/category/create", formData, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "multipart/form-data",
            },
          }),
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['category']);

            toast({
              position: "top",
              title: "Successfully saved category.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setLoading(false);
            reset();
            onClose();
          },
          onError: (error: any) => {
            console.error("Error saving product:", error);
            toast({
              position: "top",
              title: "Failed to save category.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            setLoading(false);
          },
        }
      );

      
  const onSubmit: SubmitHandler<CategoryProps> = (data) => {
    setLoading(true);
  
      const formData = new FormData();
      formData.append(
        "category",
        new Blob([JSON.stringify({
          categoryName: data.categoryName
        })],
        { type: "application/json" })
      );
      formData.append("file", data.file[0]);
      mutation.mutate(formData);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isOpen, 
    onOpen, 
    onClose
  };
}

export default useCreateCategory