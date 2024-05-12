import { Box } from "@chakra-ui/react";
import React from "react";

const SellerPage = () => {
  return (
    <Box
      h="500px"
      bg="blue"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="red"
        h="150px"
        w="150px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="30px"
      >
        SELLER
      </Box>
      <Box
        bg="black"
        h="100px"
        w="100px"
        position="absolute"
        top="20px"
        left="20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        BLACK
      </Box>
      <Box
        bg="white"
        h="100px"
        w="100px"
        color="black"
        position="relative"
        top="300px"
        right="-300px"
      >
        WHITE
      </Box>
    </Box>
  );
};

export default SellerPage;
