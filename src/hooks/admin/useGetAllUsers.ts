import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface PaginateProps {
    pageNo: number;
    pageSize: number;
    sortBy: string;
}

export interface UserProps {
    email: string;
    name: string;
    address: string;
    contactNumber: string;
    role: string;
    photoUrl: string;
    frozen: boolean;
}

interface PageResponse {
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

interface UserResponse {
    userModels: UserProps[];
    pageResponse: PageResponse;
}

const apiClient = axiosInstance;

export const useGetAllUsers = ({pageNo, pageSize, sortBy}: PaginateProps) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['userList', pageNo, pageSize, sortBy],
        queryFn: async () => {
            const {data} = await apiClient.get<UserResponse>(`/user/all`, 
            {
                headers:{
                    Authorization: `Bearer ${jwtToken}`,
                },  
                params: {
                    pageNo: pageNo - 1,
                    pageSize: pageSize,
                    sortBy: sortBy
                },
            }) 
            return data;
        },
        enabled: !!jwtToken
    })
}
