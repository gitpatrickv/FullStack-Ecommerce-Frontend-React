
import { useQuery } from "@tanstack/react-query";
import { StoreResponse } from "../../entities/Store";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { PaginateProps } from "./useGetAllUsers";
const apiClient = axiosInstance;

export const useGetAllStore = ({pageNo, pageSize, sortBy}: PaginateProps) => {
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    return useQuery ({
        queryKey: ['storeList',pageNo,pageSize, sortBy],
        queryFn: async () => {
            const {data} = await apiClient.get<StoreResponse>(`/store/list`, 
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
