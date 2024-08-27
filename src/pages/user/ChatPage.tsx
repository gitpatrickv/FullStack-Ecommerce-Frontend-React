import {
  Box,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { useLocation } from "react-router-dom";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatList from "../../components/Chat/ChatList";
import Message from "../../components/Chat/Message";
import SendMessage from "../../components/Chat/SendMessage";
import useGetAllStoreChats from "../../hooks/seller/useGetAllStoreChats";
import useGetAllChats from "../../hooks/user/useGetAllChats";
import useGetChatMessages from "../../hooks/user/useGetChatMessages";
import { useAuthQueryStore } from "../../store/auth-store";
import { useChatStore } from "../../store/chat-store";

const ChatPage = () => {
  const location = useLocation();
  const { isChatMinimized, maximizeChat, chatId, setMessages, messages } =
    useChatStore();
  const { data: chatList } = useGetAllChats();
  const { data: storeChatList } = useGetAllStoreChats();
  const { data: getChatById, refetch: refetchChatMessages } =
    useGetChatMessages(chatId ?? 0);
  const { authStore } = useAuthQueryStore();
  const currentUser = authStore.authUser;

  useEffect(() => {
    if (getChatById) {
      setMessages(getChatById.messageModelList);
    }
  }, [getChatById, setMessages]);

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
          as="section"
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
            templateRows="453px 97px"
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
                      <Box key={chat.chatId}>
                        <ChatList
                          list={chat}
                          refetchMessages={refetchChatMessages}
                        />
                      </Box>
                    ))}
                  </>
                ) : (
                  <>
                    {chatList?.map((chat) => (
                      <Box key={chat.chatId}>
                        <ChatList
                          list={chat}
                          refetchMessages={refetchChatMessages}
                        />
                      </Box>
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
                {chatId ? (
                  <>
                    {messages.map((message) => (
                      <Box key={message.messageId}>
                        <Message
                          messages={message}
                          isSender={message.sender === currentUser}
                        />
                      </Box>
                    ))}
                  </>
                ) : (
                  <Card>
                    <CardBody>
                      <Box display="flex" justifyContent="center" mb="150px">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <IoMdChatboxes size="80px" />
                          <Text fontSize="xx-large">
                            Welcome to Shopee Chat
                          </Text>
                        </Box>
                      </Box>
                    </CardBody>
                  </Card>
                )}
              </Box>
              {chatId && <Divider />}
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
