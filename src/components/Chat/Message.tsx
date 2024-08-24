import { Box, Text } from "@chakra-ui/react";
import { MessageModel } from "../../entities/Message";

interface Props {
  messages: MessageModel;
  isSender: boolean;
}

const Message = ({ messages, isSender }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection={isSender ? "row-reverse" : "row"}
      alignItems="center"
      mb={4}
      width="100%"
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
        color={isSender ? "white" : "black"}
        p={3}
        borderRadius="10px"
      >
        <Text whiteSpace="pre-wrap" fontSize="lg">
          {messages.content}
        </Text>
      </Box>
    </Box>
  );
};

export default Message;
