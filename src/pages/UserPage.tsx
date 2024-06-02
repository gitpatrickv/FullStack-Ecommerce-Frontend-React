import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegEdit, FaRegFileAlt, FaRegUser, FaHeart } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import { useAuthQueryStore } from "../store/auth-store";

const UserPage = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const [isProfilePage, setIsProfilePage] = useState(false);
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: user } = useGetUser(jwtToken);
  const location = useLocation();

  useEffect(() => {
    setIsProfilePage(location.pathname.startsWith("/user/account"));
  }, [location.pathname]);

  return (
    <Grid
      templateColumns="200px 300px 1fr 200px "
      templateAreas={`
      " asideLeft user main asideRight"     
      `}
      pt="25px"
    >
      <GridItem area="user">
        <Box>
          <Link to="/user/account/profile">
            <Box display="flex" justifyContent="start" pt="26px" pl="20px">
              <Avatar
                src={
                  user?.photoUrl
                    ? user?.photoUrl
                    : "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
                }
                size="md"
              />
              <Box display="flex" flexDirection="column" alignItems="start">
                <Text fontSize={fontSize} pl="20px">
                  {user?.name}
                </Text>

                <Box
                  display="flex"
                  justifyContent="start"
                  pl="20px"
                  color="gray.600"
                >
                  <FaRegEdit size="20" />
                  <Text fontSize={fontSize} pl="5px">
                    Edit Profile
                  </Text>
                </Box>
              </Box>
            </Box>
          </Link>
          <Divider mt="15px" maxWidth="90%" />
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            pt="20px"
            ml="15px"
            cursor="pointer"
          >
            <FaRegUser size="20px" />

            <Link to="/user/account/profile">
              <Text
                fontSize={fontSize}
                pl="15px"
                _hover={{ color: "orange.400" }}
                fontWeight="semibold"
              >
                My Account
              </Text>
            </Link>
          </Box>
          <Box display="flex" justifyContent="start" ml="35px" mt="10px">
            <Box display="flex" flexDirection="column">
              {isProfilePage && (
                <>
                  <Link to="/user/account/profile">
                    <Text
                      pl="15px"
                      fontSize={fontSize}
                      color={
                        location.pathname === "/user/account/profile"
                          ? "orange.400"
                          : "gray.600"
                      }
                      cursor="pointer"
                      mb="5px"
                    >
                      Profile
                    </Text>
                  </Link>
                  <Link to="/user/account/password">
                    <Text
                      pl="15px"
                      fontSize={fontSize}
                      color={
                        location.pathname === "/user/account/password"
                          ? "orange.400"
                          : "gray.600"
                      }
                      cursor="pointer"
                      mb="5px"
                    >
                      Change password
                    </Text>
                  </Link>
                </>
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            pt="15px"
            ml="15px"
            cursor="pointer"
          >
            <FaHeart color="red" size="20px" />
            <Link to="/user/favorites">
              <Text
                fontSize={fontSize}
                pl="15px"
                _hover={{ color: "orange.400" }}
                fontWeight="semibold"
              >
                My Favorites
              </Text>
            </Link>
          </Box>
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            pt="20px"
            ml="15px"
            cursor="pointer"
          >
            <FaRegFileAlt size="20px" />
            <Link to="/user/purchase">
              <Text
                fontSize={fontSize}
                pl="15px"
                _hover={{ color: "orange.400" }}
                fontWeight="semibold"
              >
                My Purchase
              </Text>
            </Link>
          </Box>
        </Box>
      </GridItem>
      <GridItem area="main">
        {location.pathname === "/user/favorites" ? (
          <Box>
            <Outlet />
          </Box>
        ) : (
          <Box>
            <Card>
              <Outlet />
            </Card>
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default UserPage;
