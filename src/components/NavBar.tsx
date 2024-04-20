import { HStack } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack px="10" py="2">
      <Link to="/">
        <FaHome size="50" />
      </Link>
      <SearchInput />
      <Cart />
    </HStack>
  );
};

export default NavBar;
