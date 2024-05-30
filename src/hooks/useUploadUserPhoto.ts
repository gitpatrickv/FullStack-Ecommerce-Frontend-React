import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../services/api-client';

interface Props {
    jwtToken: string;
    file: File;
}

const apiClient = axiosInstance;

const useUploadUserPhoto = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        async ({ jwtToken, file }: Props) => {
            const formData = new FormData();
            formData.append('file', file);

            const { data } = await apiClient.post("/user/image/upload", formData, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['user']);
            },
            onError: (error) => {
                console.error('Error uploading photo', error);
            }
        },
    );

    return mutation;
}

export default useUploadUserPhoto;
