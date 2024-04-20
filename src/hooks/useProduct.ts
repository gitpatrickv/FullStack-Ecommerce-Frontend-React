import { useEffect, useState } from "react";
import Product from "../entities/Product";
import { axiosInstance } from "../services/api-client";
import Inventory from "../entities/Inventory";

const apiClient = axiosInstance;

const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
  
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

export default useProduct