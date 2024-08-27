import { Box, Text } from "@chakra-ui/react";
import { MessageModel } from "../../entities/Message";
import { useRef, useEffect } from "react";

interface Props {
  messages: MessageModel;
  isSender: boolean;
}

const Message = ({ messages, isSender }: Props) => {
  const chatBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView();
    }
  }, [messages.content]);

  return (
    <Box
      display="flex"
      flexDirection={isSender ? "row-reverse" : "row"}
      alignItems="center"
      mb={2}
      mr="10px"
      ml="10px"
    >
      {/* {!isSender && (
        <Avatar
          src={
            "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="sm"
          mr="5px"
        />
      )} */}
      <Box
        bg={isSender ? "blue.500" : "gray.500"}
        color="black"
        p={2}
        borderRadius="10px"
      >
        <Text whiteSpace="pre-wrap" fontSize="lg">
          {messages.content}
        </Text>
        <Text textAlign="end" fontSize="xs">
          {messages.timestamp}
        </Text>
      </Box>
      <Box ref={chatBottom}></Box>
    </Box>
  );
};

export default Message;
