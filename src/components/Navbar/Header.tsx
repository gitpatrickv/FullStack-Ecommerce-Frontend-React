import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import ColorModeSwitch from "../ColorModeSwitch";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const queryClient = useQueryClient();
  const jwtToken = localStorage.getItem("jwtToken") || "";
  const { data: user } = useGetUser(jwtToken);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    queryClient.setQueryData(["user"], null);
    navigate("/");
  };
  return (
    <Flex p="4" px="10">
      <Spacer />
      <HStack spacing={5}>
        {user ? (
          <>
            <Text position="relative" right="-15px">
              {user.email}
            </Text>
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FaUserCircle size="30px" />}
                  variant="none"
                />
                <MenuList>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>My Purchase</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </>
        ) : (
          <>
            <Link to="/login">
              <Text _hover={{ textDecoration: "underline" }}>Login</Text>
            </Link>
            <Link to="/register">
              <Text _hover={{ textDecoration: "underline" }}>Register</Text>
            </Link>
          </>
        )}
        {/* <ColorModeSwitch /> */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<RxHamburgerMenu />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>
              <ColorModeSwitch />
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
