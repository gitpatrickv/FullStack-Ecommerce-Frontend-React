import { Box, Flex, HStack, Spacer } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack spacing={{ base: 2, md: 4 }} px={{ base: 2, md: 10 }} py="2">
      <Link to="/">
        <FaHome size="50" />
      </Link>
      <SearchInput />
      <IoIosCart size="60" />
    </HStack>
  );
};

export default NavBar;
