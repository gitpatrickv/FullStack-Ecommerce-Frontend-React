import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/api-client';

interface AddToCartProps {
  productId: string;
  quantity: number;
  jwtToken: string;
}

const apiClient = axiosInstance;

const useAddToCart = () => {
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
    }
  );
};

    
export default useAddToCart
