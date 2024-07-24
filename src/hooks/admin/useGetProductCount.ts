import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
    productCount: number;
}

const useGetProductCount = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['productCount'],
        queryFn: async () => {
            const {data} = await apiClient.get<Props>(`/product/count`, 
            {
                headers:{
                    Authorization: `Bearer ${jwtToken}`,
                }
            }) 
            return data;
        },
        enabled: !!jwtToken
    })
    
}

export default useGetProductCount