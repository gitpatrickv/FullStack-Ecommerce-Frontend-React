import { useEffect, useState } from "react";
import Product from "../entities/Product";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);  //initial state is an empty array, setProducts will be used to update this state
  
    useEffect(() => {
        const fetchData = async () => {
            try {
   const response = await apiClient.get<Product[]>("/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
        
        fetchData();
    }, []);

  return (

    products
  )
}

export default useProducts