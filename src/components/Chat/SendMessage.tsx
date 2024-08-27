import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import useSendMessage, {
  SendMessageProps,
} from "../../hooks/user/useSendMessage";
import { useChatStore } from "../../store/chat-store";

const SendMessage = () => {
  const { chatId, addMessage } = useChatStore();
  const focusRef = useRef<HTMLInputElement | null>(null);
  const { mutate: sendMessage } = useSendMessage();

  const { register, handleSubmit, reset } = useForm<SendMessageProps>();

  useEffect(() => {
    reset();
  }, [chatId]);

  useEffect(() => {
    if (focusRef.current && chatId) {
      focusRef.current.focus();
    }
  }, [chatId]);

  const stompClientRef = useRef<Stomp.Client | null>(null);
  const [_isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        stompClientRef.current = client;
        setIsConnected(true);

        console.log(`Connected to WebSocket for chat ID: ${chatId}`);

        client.subscribe(`/user/${chatId}/messages`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          addMessage(receivedMessage);
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      }
    );

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected");
          setIsConnected(false);
        });
        stompClientRef.current = null;
      }
    };
  }, [chatId]);

  const onSubmit = (data: SendMessageProps) => {
    const stompClient = stompClientRef.current;
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/chat`, {}, JSON.stringify({ ...data, chatId }));
    } else {
      console.error("STOMP client is not connected");
    }

    sendMessage(
      { content: data.content, chatId: chatId! },
      {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          console.error("Error sending message:", error);
        },
      }
    );
  };

  return (
    <>
      {chatId && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Input
              {...register("content", { required: true })}
              placeholder="Type a message here"
              borderRadius="none"
              maxWidth="400px"
              ref={(e) => {
                register("content", { required: true }).ref(e);
                focusRef.current = e;
              }}
            />
            <InputRightElement>
              <IconButton
                aria-label="show"
                icon={<IoMdSend size="25px" />}
                bg="transparent"
                _hover={{ bg: "transparent" }}
                mr="5px"
                type="submit"
                isDisabled={chatId ? false : true}
              />
            </InputRightElement>
          </InputGroup>
        </form>
      )}
    </>
  );
};

export default SendMessage;
