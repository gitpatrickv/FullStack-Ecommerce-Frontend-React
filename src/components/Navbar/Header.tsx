import {
  Avatar,
  Box,
  Card,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaShopify, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useCartTotal from "../../hooks/user/useCartTotal";
import useGetUser from "../../hooks/user/useGetUser";
import { useAuthQueryStore } from "../../store/auth-store";
import ColorModeSwitch from "../ColorModeSwitch";
import SearchInput from "./SearchInput";

const Header = () => {
  const queryClient = useQueryClient();
  const { logout, authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const role = authStore.role;
  const { data: user } = useGetUser(jwtToken);
  const { data: cartTotal } = useCartTotal(jwtToken);

  const navigate = useNavigate();

  const handleNavigateHomeClick = () => {
    if (role === "ADMIN") {
      navigate("/admin/shop/list");
    } else {
      navigate("/");
    }
  };

  const handleNavigateSellerClick = () => {
    if (role === "SELLER") {
      navigate("/seller");
    } else {
      navigate("/seller/login");
    }
  };

  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
  };
  return (
    <Card height="125px" borderRadius="none">
      <Grid
        templateColumns="0.4fr 0.5fr 2fr 0.5fr 0.4fr"
        templateRows=" 0.3fr 0.5fr"
        templateAreas={`
  
    "asideLeft content1 content2 content3 asideRight"
    "asideLeft content4 content5 content6 asideRight"
`}
        alignItems="center"
        gridGap="25px"
        mt="5px"
      >
        <GridItem area="content1" display="flex" justifyContent="start">
          {!user || role === "SELLER" ? (
            <Text
              _hover={{
                color: "orange.400",
              }}
              onClick={handleNavigateSellerClick}
              cursor="pointer"
            >
              Seller Centre
            </Text>
          ) : role === "USER" ? (
            <Link to="/seller/store/create">
              <Text
                _hover={{
                  color: "orange.400",
                }}
              >
                Start Selling
              </Text>
            </Link>
          ) : (
            ""
          )}
        </GridItem>
        <GridItem area="content3" display="flex" justifyContent="flex-end">
          <Box>
            <HStack spacing={3}>
              {user ? (
                <>
                  <Box display="flex">
                    <Text mt="10px" mr="5px">
                      {user.email}
                    </Text>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={
                          <Avatar
                            src={
                              user?.photoUrl
                                ? user?.photoUrl
                                : "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
                            }
                            size="sm"
                          />
                        }
                        variant="none"
                      />
                      <MenuList>
                        {/* <MenuItem>{user.email}</MenuItem>
                        <MenuDivider /> */}
                        {role === "USER" || role === "SELLER" ? (
                          <>
                            <Link to="/user/account/profile">
                              <MenuItem>My Account</MenuItem>
                            </Link>
                            <Link to="/user/favorites">
                              <MenuItem>My Favorites</MenuItem>
                            </Link>
                            <Link to="/user/following">
                              <MenuItem>My Following</MenuItem>
                            </Link>
                            <Link to="/user/purchase">
                              <MenuItem>My Purchase</MenuItem>
                            </Link>
                          </>
                        ) : (
                          ""
                        )}

                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Text
                      _hover={{
                        color: "orange.400",
                      }}
                    >
                      Login
                    </Text>
                  </Link>
                  <Link to="/register">
                    <Text
                      _hover={{
                        color: "orange.400",
                      }}
                    >
                      Register
                    </Text>
                  </Link>
                </>
              )}
              <ColorModeSwitch />
            </HStack>
          </Box>
        </GridItem>
        <GridItem area="content4">
          <Box
            display="flex"
            justifyContent="center"
            onClick={handleNavigateHomeClick}
            cursor="pointer"
          >
            <FaShopify size="40" />
          </Box>
        </GridItem>
        <GridItem area="content5">
          <SearchInput />
        </GridItem>
        <GridItem area="content6">
          {role === "USER" || role === "SELLER" ? (
            <>
              <Link to="/cart">
                <Box display="flex" justifyContent="center">
                  <FaShoppingCart size="40px" />
                  <Box
                    h="27px"
                    w="27px"
                    bg="gray.600"
                    borderRadius="30px"
                    position="relative"
                    top="-9px"
                    left="-12px"
                  >
                    <Text
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="orange.400"
                      fontSize="18px"
                      fontWeight="semibold"
                    >
                      {cartTotal?.cartItems ?? 0}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </>
          ) : (
            ""
          )}
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Header;
