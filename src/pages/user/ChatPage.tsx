import { Box, Card, Divider, Grid, GridItem, Text } from "@chakra-ui/react";
import ChatList from "../../components/Chat/ChatList";
import Message from "../../components/Chat/Message";
import { useChatStore } from "../../store/chat-store";
import { IoMdChatboxes } from "react-icons/io";
import ChatHeader from "../../components/Chat/ChatHeader";
import useGetAllChats from "../../hooks/user/useGetAllChats";
import useGetChatById from "../../hooks/user/useGetChatById";
import { useAuthQueryStore } from "../../store/auth-store";

const ChatPage = () => {
  const { isChatMinimized, maximizeChat, chatId } = useChatStore();
  const { data: chatList } = useGetAllChats();
  const { data: getChatById } = useGetChatById(chatId ?? 0);
  const { authStore } = useAuthQueryStore();
  const currentUser = authStore.authUser;
  return (
    <>
      {isChatMinimized ? (
        <Card
          width="150px"
          height="50px"
          borderRadius="none"
          onClick={maximizeChat}
          cursor="pointer"
          bg="orange.500"
        >
          <Box
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt="10px"
          >
            <IoMdChatboxes size="35px" />
            <Text ml="10px" fontSize="xl">
              Chat
            </Text>
          </Box>
        </Card>
      ) : (
        <Card width="700px" height="550px" borderRadius="none">
          <ChatHeader />
          <Divider color="gray.500" />
          <Grid
            templateColumns="250px 20px 430px"
            templateAreas={`
      "list divider message"
    `}
            height="100vh"
          >
            <GridItem area="list" mt="10px" overflowY="auto">
              {chatList?.map((chat) => (
                <ChatList key={chat.chatId} list={chat} />
              ))}
            </GridItem>
            <GridItem area="divider">
              <Divider orientation="vertical" ml="5px" mr="5px" />
            </GridItem>
            <GridItem
              area="message"
              mt="10px"
              mr="10px"
              overflowY="auto"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              {getChatById?.messageModelList.map((message) => (
                <Message
                  key={message.messageId}
                  messages={message}
                  isSender={message.sender === currentUser}
                />
              ))}
            </GridItem>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default ChatPage;
