import { useMutation,useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';
import { useToast } from '@chakra-ui/react';

interface AddToCartProps {
  productId: string;
  quantity: number;
  jwtToken: string;
}

const apiClient = axiosInstance;

const useAddToCart = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    async ({ productId,  quantity, jwtToken }: AddToCartProps) => {
      const { data } = await apiClient.put(
        "/cart/add",
        { productId, quantity },
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
        queryClient.invalidateQueries(['cart']);
        toast({
          position: "top",
          title: "Item has been added to your cart",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      }
    },
  );
};

    
export default useAddToCart
