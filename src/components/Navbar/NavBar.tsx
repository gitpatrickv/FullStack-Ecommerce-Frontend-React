import { Box, HStack } from "@chakra-ui/react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack spacing={{ base: 2, md: 4 }} px={{ base: 2, md: 10 }}>
      <Link to="/">
        <FaHome size="55" />
      </Link>
      <SearchInput />
      <Link to="/cart">
        <Box position="relative" bottom="-20px">
          <FaShoppingCart size="50" />
          <Box
            h="30px"
            w="30px"
            bg="red"
            borderRadius="30px"
            position="relative"
            right="-35px"
            top="-60px"
          ></Box>
        </Box>
      </Link>
    </HStack>
  );
};

export default NavBar;
