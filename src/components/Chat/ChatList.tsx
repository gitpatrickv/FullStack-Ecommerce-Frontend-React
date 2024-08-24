import { Avatar, Box, Text } from "@chakra-ui/react";
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

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      bg={chatId === list.chatId ? "gray.500" : "none"}
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
            list.storePhotoUrl
              ? list.storePhotoUrl
              : "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="md"
        />

        <Box display="flex" flexDirection="column" ml="10px">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            textTransform="capitalize"
            isTruncated={true}
            maxWidth="120px"
          >
            {list.storeName}
          </Text>
          <Text fontSize="sm">Message....</Text>
        </Box>
      </Box>
      <Box mt="15px" mr="5px">
        <Text fontSize="sm">08/08</Text>
      </Box>
    </Box>
  );
};

export default ChatList;
