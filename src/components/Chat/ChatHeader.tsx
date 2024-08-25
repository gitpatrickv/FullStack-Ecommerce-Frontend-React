import { Box, Text } from "@chakra-ui/react";
import { IoMdChatboxes } from "react-icons/io";
import { TbWindowMinimize } from "react-icons/tb";

import { useChatStore } from "../../store/chat-store";

const ChatHeader = () => {
  const { minimizeChat } = useChatStore();
  return (
    <>
      <Box
        padding={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" color="orange.500" userSelect="none">
          <IoMdChatboxes size="32px" />
          <Text fontSize="xl" fontWeight="semibold" ml="10px">
            Chat
          </Text>
        </Box>
        <Box onClick={minimizeChat} cursor="pointer">
          <TbWindowMinimize size="28px" />
        </Box>
      </Box>
    </>
  );
};

export default ChatHeader;
