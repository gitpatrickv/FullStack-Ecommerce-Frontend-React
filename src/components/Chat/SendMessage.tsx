import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../hooks/user/useSendMessage";
import { useChatStore } from "../../store/chat-store";

const SendMessage = () => {
  const { chatId } = useChatStore();
  const focusRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, onSubmit, reset } = useSendMessage(chatId!);

  useEffect(() => {
    reset();
  }, [chatId]);

  useEffect(() => {
    if (focusRef.current && chatId) {
      focusRef.current.focus();
    }
  }, [chatId]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit)(event);
        }}
      >
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
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </>
  );
};

export default SendMessage;
