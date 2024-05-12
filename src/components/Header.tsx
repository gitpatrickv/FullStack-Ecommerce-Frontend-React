import { Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  return (
    <Flex p="4" px="10">
      <Spacer />
      <HStack spacing={5}>
        <Link to="/login">
          <Text _hover={{ textDecoration: "underline" }}>Login</Text>
        </Link>
        <Link to="/register">
          <Text _hover={{ textDecoration: "underline" }}>Register</Text>
        </Link>
        <ColorModeSwitch />
      </HStack>
    </Flex>
  );
};

export default Header;
