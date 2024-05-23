import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import ColorModeSwitch from "../ColorModeSwitch";

const jwtToken = localStorage.getItem("jwtToken");
const Header = () => {
  const { data: user } = useGetUser(jwtToken || "");

  return (
    <Flex p="4" px="10">
      <Spacer />
      <HStack spacing={5}>
        {user?.data ? (
          <>
            <Box position="relative" left="15px">
              <FaUserCircle size="25px" />
            </Box>
            <Text>{user?.data.email}</Text>
          </>
        ) : (
          <Link to="/login">
            <Text _hover={{ textDecoration: "underline" }}>Login</Text>
          </Link>
        )}
        {user?.data ? (
          ""
        ) : (
          <Link to="/register">
            <Text _hover={{ textDecoration: "underline" }}>Register</Text>
          </Link>
        )}

        <ColorModeSwitch />
      </HStack>
    </Flex>
  );
};

export default Header;
