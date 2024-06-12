import { useQuery } from "@tanstack/react-query";
import { User } from "../../entities/User";
import { axiosInstance } from "../../services/api-client";
const apiClient = axiosInstance;

const useGetUser = (jwtToken : string) => {
    return useQuery<User>({
        queryKey: ['user'],
        queryFn: async () => {
        const {data} = await apiClient.get<User>('/user', 
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        })
        return data;
    },
    enabled: !!jwtToken,
 
    })
}

export default useGetUser