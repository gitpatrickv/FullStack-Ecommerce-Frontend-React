import { Box, Card, Divider, Grid, GridItem, Text } from "@chakra-ui/react";
import { IoMdChatboxes } from "react-icons/io";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatList from "../../components/Chat/ChatList";
import Message from "../../components/Chat/Message";
import SendMessage from "../../components/Chat/SendMessage";
import useGetAllChats from "../../hooks/user/useGetAllChats";
import useGetChatMessages from "../../hooks/user/useGetChatMessages";
import { useAuthQueryStore } from "../../store/auth-store";
import { useChatStore } from "../../store/chat-store";
import { useLocation } from "react-router-dom";
import useGetAllStoreChats from "../../hooks/seller/useGetAllStoreChats";

const ChatPage = () => {
  const location = useLocation();
  const { isChatMinimized, maximizeChat, chatId } = useChatStore();
  const { data: chatList } = useGetAllChats();
  const { data: storeChatList } = useGetAllStoreChats();
  const { data: getChatById } = useGetChatMessages(chatId ?? 0);
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
            templateColumns="250px 1px 449px"
            templateRows="452px 98px"
            templateAreas={`
      "list divider message"
      "list divider send"
    `}
            height="100vh"
          >
            <GridItem area="list" mt="10px">
              <Box overflowY="auto">
                {location.pathname.startsWith("/seller") ? (
                  <>
                    {storeChatList?.map((chat) => (
                      <ChatList key={chat.chatId} list={chat} />
                    ))}
                  </>
                ) : (
                  <>
                    {chatList?.map((chat) => (
                      <ChatList key={chat.chatId} list={chat} />
                    ))}
                  </>
                )}
              </Box>
            </GridItem>
            <GridItem area="divider">
              <Divider orientation="vertical" />
            </GridItem>
            <GridItem
              area="message"
              mt="10px"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <Box overflowY="auto" mb="5px">
                {getChatById?.messageModelList.map((message) => (
                  <Message
                    key={message.messageId}
                    messages={message}
                    isSender={message.sender === currentUser}
                  />
                ))}
              </Box>
              <Divider />
            </GridItem>
            <GridItem area="send">
              <SendMessage />
            </GridItem>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default ChatPage;
