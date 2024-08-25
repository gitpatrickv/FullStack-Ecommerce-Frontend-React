import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface SendMessageProps {
    content: string;
    chatId: number;
}

const apiClient = axiosInstance;

const useSendMessage = (chatId: number) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm<SendMessageProps>();
    const { authStore } = useAuthQueryStore();
    const jwtToken = authStore.jwtToken;

    const mutation = useMutation({
        mutationFn: (data: SendMessageProps) => apiClient.post("/messages", data, 
            {
                headers: {
                        Authorization: `Bearer ${jwtToken}`
                        }
                }
        )
        .then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['messages']);
            reset();
        },
        onError: (error) => {
            console.error("Message submission failed:", error);
          },
    })

    const onSubmit: SubmitHandler<{content: string}> = (data) => {
        mutation.mutate({...data, chatId});
      };

      return {
        register,handleSubmit,onSubmit, reset
      }
    
}

export default useSendMessage