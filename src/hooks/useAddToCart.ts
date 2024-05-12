import { axiosInstance } from '../services/api-client';

const apiClient = axiosInstance;

const useAddToCart = async (  
    productId: string,
    quantity: number,
    jwtToken: string) => {

        try {
          const { data } = await apiClient.put(
            "/cart/add",
            { productId, quantity },
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          console.log("Item added to cart:", data);
        } catch (error) {
          console.error("Failed to add item to cart:", error);
        }

        return  { productId,quantity,jwtToken}
      };
    
export default useAddToCart
