import { useQuery } from "@tanstack/react-query";
import { User } from "../entities/User";
import { axiosInstance } from "../services/api-client";
const apiClient = axiosInstance;

const useGetUser = (jwtToken : string) => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => apiClient.get<User>('/user', 
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        })
    })
}

export default useGetUser