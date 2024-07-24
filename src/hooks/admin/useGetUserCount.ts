
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
    userCount: number;
}

const useGetUserCount = () => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['userCount'],
        queryFn: async () => {
            const {data} = await apiClient.get<Props>(`/user/count`, 
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

export default useGetUserCount