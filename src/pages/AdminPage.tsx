import { Box, Flex, Text } from "@chakra-ui/react";

const AdminPage = () => {
  return (
    <Box height="500px" bg="blue">
      <Text position="relative" textAlign="center" top="300px">
        AdminPage
      </Text>
      <Box
        bg="green"
        w="50px"
        h="50px"
        position="absolute"
        bottom="50px"
        right="50px"
      >
        BOX
      </Box>
      <Box
        bg="red"
        w="100px"
        h="100px"
        margin="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="50px"
      >
        <Text>RED BOX</Text>
      </Box>
    </Box>
  );
};

export default AdminPage;
