import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface UserProps {
    email: string;
    name: string;
    address: string;
    contactNumber: string;
    role: string;
    photoUrl: string;
    frozen: boolean;
}

const apiClient = axiosInstance;

export const useGetAllUsers = (sortBy: string) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['userList', sortBy],
        queryFn: async () => {
            const {data} = await apiClient.get<UserProps[]>(`/user/all`, 
            {
                headers:{
                    Authorization: `Bearer ${jwtToken}`,
                },  
                params: {
                    sortBy: sortBy
                },
            }) 
            return data;
        },
        enabled: !!jwtToken
    })
}
