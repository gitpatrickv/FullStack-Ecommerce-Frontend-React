import { useQuery } from "@tanstack/react-query";
import Product from "../entities/Product";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Product>('/product');

const useProductDetail = (productId: string) => useQuery ({
  queryKey: ['product', productId],
  queryFn: () => apiClient.get(productId)
});

export default useProductDetail;