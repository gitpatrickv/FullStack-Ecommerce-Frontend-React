import { Avatar, Box, Text, useColorMode } from "@chakra-ui/react";
import { ChatProps } from "../../hooks/user/useGetAllChats";
import { useChatStore } from "../../store/chat-store";

interface Props {
  list: ChatProps;
}

const ChatList = ({ list }: Props) => {
  const { setChatId, chatId } = useChatStore();
  const handleChatSelectClick = (chatId: number) => {
    setChatId(chatId);
  };
  const { colorMode } = useColorMode();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      bg={chatId === list.chatId ? "gray.100" : "none"}
    >
      <Box
        display="flex"
        alignItems="center"
        onClick={() => handleChatSelectClick(list.chatId)}
        cursor="pointer"
        padding={3}
      >
        <Avatar
          src={
            list.photoUrl
              ? list.photoUrl
              : "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="sm"
        />

        <Box display="flex" flexDirection="column" ml="10px">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            textTransform="capitalize"
            isTruncated={true}
            maxWidth="120px"
            color={colorMode === "dark" ? "orange.500" : "black.500"}
          >
            {list.name}
          </Text>
          <Text
            fontSize="sm"
            isTruncated={true}
            maxWidth="120px"
            color="gray.500"
          >
            {list.content}
          </Text>
        </Box>
      </Box>
      <Box mt="15px" mr="10px">
        <Text fontSize="sm" color="gray.500">
          {list.timestamp}
        </Text>
      </Box>
    </Box>
  );
};

export default ChatList;
