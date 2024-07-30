import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../services/api-client';
import { useAuthQueryStore } from '../../store/auth-store';

interface Props {
    file: File;
}

const apiClient = axiosInstance;

const useUpdateCategoryPhoto = (categoryId: string) => {
    const queryClient = useQueryClient();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    const mutation = useMutation({
        mutationFn: (formData: Props) => apiClient.post(`/product/category/image/upload/${categoryId}`, formData,
            {
            headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'multipart/form-data',
                    }
            }
        )
        .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries(['category']);
        },
        onError: (error) => {
            console.error('Error uploading photo', error);
        }
    })

    return mutation;
}

export default useUpdateCategoryPhoto