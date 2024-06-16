import { useMutation,useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';

interface AddToCartProps {
  productId: string;
  quantity: number;
  jwtToken: string;
}

const apiClient = axiosInstance;

const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ productId, quantity, jwtToken }: AddToCartProps) => {
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
      }
    }
  );
};

    
export default useAddToCart
