import { useEffect, useState } from "react";
import Product from "../entities/Product";
import { axiosInstance } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = axiosInstance;

const useProducts = () => useQuery ({
  queryKey: ['product'],
  queryFn: () => apiClient.get<Product[]>('product'),
});
export default useProducts